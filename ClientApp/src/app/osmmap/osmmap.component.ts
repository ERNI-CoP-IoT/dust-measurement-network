import { Component, OnInit, OnDestroy } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSMSource from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import { fromLonLat, transformExtent } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Overlay from 'ol/Overlay';
import MapEvent from 'ol/MapEvent';
import { Circle, Fill, Stroke, Style } from 'ol/style';

import { Subscription, fromEvent } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';

import { SensorDto } from '../service/SensorDto';
import { DustService } from '../service/dust.service';

@Component({
  selector: 'app-osmmap',
  templateUrl: './osmmap.component.html',
  styleUrls: ['./osmmap.component.css']
})
export class OsmMapComponent implements OnInit, OnDestroy {
  private map: Map;
  private vectorSource = new VectorSource();
  private mapMoveSubscription: Subscription;

  constructor(private dustService: DustService) {}

  ngOnInit() {
    this.map = new Map({
      target: 'osmmap',
      layers: [
        new TileLayer({
          source: new OSMSource()
        }),
        new VectorLayer({
          source: this.vectorSource,
          style: new Style({
            image: new Circle({
              radius: 8,
              fill: new Fill({
                color: [52, 58, 64, 0.9]
              }),
              stroke: new Stroke({
                color: [255, 255, 255, 0.9],
                width: 1
              })
            })
          })
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: 13
      })
    });

    this.map.on('click', evt => {
      const feature = this.map.forEachFeatureAtPixel(evt.pixel, (ft, layer) => ft);
      if (feature) {
          this.schowPopup(feature.get('data'));
      }
    });

    this.mapMoveSubscription = fromEvent(this.map, 'moveend').pipe(
      debounceTime(1000),
      map((evt: MapEvent) => transformExtent(evt.frameState.extent, this.map.getView().getProjection(), 'EPSG:4326')),
      switchMap(extent => this.dustService.getSensors(extent[0], extent[1], extent[2], extent[3]))
    ).subscribe(
      result => this.drawMarkers(result),
      err => console.error(err)
    );
    this.getUserPosition();
  }

  ngOnDestroy(): void {
   this.mapMoveSubscription.unsubscribe();
  }

  private drawMarkers(markers: SensorDto[]) {
    this.vectorSource.clear();
    for (let i = 0; i < markers.length; i++) {
      const iconFeature = new Feature({
        geometry: new Point(fromLonLat([markers[i].lon, markers[i].lat])),
        name: markers[i].id,
        data: markers[i]
      });
      this.vectorSource.addFeature(iconFeature);
    }
  }

  private getUserPosition() {
    if (navigator.geolocation) {
      const view = this.map.getView();
      navigator.geolocation.getCurrentPosition(position => {
        view.setCenter(fromLonLat([position.coords.longitude, position.coords.latitude]));
        view.setZoom(13);
      });
    }
  }

  private schowPopup(sensorData: SensorDto) {
    console.log('popup', sensorData);
  }
}
