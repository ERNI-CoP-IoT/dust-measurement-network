import { Component, AfterViewInit, OnInit, Inject, ApplicationRef, ComponentFactoryResolver, Injector, EmbeddedViewRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PopupInfoComponent } from '../popup-info/popup-info.component';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
// import XYZ from 'ol/source/XYZ';
import OSMSource from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Overlay from 'ol/Overlay';
import { Circle, Fill, Stroke, Style } from 'ol/style';

@Component({
  selector: 'app-osmmap',
  templateUrl: './osmmap.component.html',
  styleUrls: ['./osmmap.component.css']
})
export class OsmMapComponent implements AfterViewInit, OnInit {
  private map: Map;
  private defaultLatitude: number = 47.3769;
  private defaultLongitude: number = 8.5417;
  private vectorSource = new VectorSource();
  isLoaded: boolean;
  private overlay: Overlay;

  constructor(
    private http: HttpClient, 
    @Inject('BASE_URL') private baseUrl: string, 
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {
    this.isLoaded = false;
  }

  ngAfterViewInit() {
    this.trackPosition();

    var closer = document.getElementById('popup-closer');
    closer.onclick = function() {
      this.overlay.setPosition(undefined);
      closer.blur();
      return false;
    }.bind(this);
  }

  ngOnInit() {
    this.overlay = new Overlay({
      element: document.getElementById('popup'),
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });

    this.map = new Map({
      target: 'osmmap',
      overlays: [this.overlay],
      layers: [
        new TileLayer({
          source: new OSMSource()
        }),
        new VectorLayer({
          source: this.vectorSource,
          style: new Style({
            fill: new Fill({
              color: '#000000'
            }),
            stroke: new Stroke({
              color: '#ffffff',
              width: 2
            }),
            image: new Circle({
              radius: 5,
              fill: new Fill({
                color: '#000000'
              })
            })
          })
        })
      ],
      view: new View({
        center: fromLonLat([this.defaultLongitude, this.defaultLatitude]),
        zoom: 13
      })
    });

    this.map.on('click', (evt) => {
      var f = this.map.forEachFeatureAtPixel(
          evt.pixel,
          function(ft, layer){return ft;}
      );
      if (f) {
          var geometry = f.getGeometry();
          var coord = geometry.getCoordinates();
          this.appendPopup(f);
          this.overlay.setPosition(coord);
      }
    });

    this.http.get<Marker[]>(this.baseUrl + 'api/sensors').subscribe(
      result => this.render(result),
      error => console.error(error));
  }

  private render(markers: Marker[]) {
    this.vectorSource.clear();
    for (let i = 0; i < markers.length; i++) {
      const iconFeature = new Feature({
        geometry: new Point(fromLonLat([markers[i].lon, markers[i].lat])),
        name: markers[i].id,
        timestamp: markers[i].timestamp,
        particulateMatter25: markers[i].particulateMatter25,
        particulateMatter100: markers[i].particulateMatter100
      });
      this.vectorSource.addFeature(iconFeature);
    }
  }

  private trackPosition() {
    if(navigator.geolocation) {
      var view = this.map.getView();
      navigator.geolocation.getCurrentPosition((position) => {
        view.setCenter(fromLonLat([position.coords.longitude, position.coords.latitude]));
        view.setZoom(13);
        this.isLoaded = true;
      });
    } else {
      this.isLoaded = true;
    }
  }

  private appendPopup(sensorData: any) {
    const popupContent = document.getElementById('popup-content');
    popupContent.childNodes.forEach((node) => node.remove());

    const componentRef = 
      this.componentFactoryResolver
      .resolveComponentFactory(PopupInfoComponent)
      .create(this.injector);

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    (<PopupInfoComponent>componentRef.instance).data = {
      id: sensorData.get('name'),
      particulateMatter25: sensorData.get('particulateMatter25'),
      particulateMatter100: sensorData.get('particulateMatter100'),
      timestamp: sensorData.get('timestamp')
    }

    popupContent.appendChild(domElem);
  }
}

interface Marker {
  id: number;
  lat: number;
  lon: number;
  timestamp: Date;
  particulateMatter25: number;
  particulateMatter100: number;
}
