import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Chart } from 'chart.js';
import { DustService } from '../service/dust.service';
import { DustDto } from '../service/DustDto';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  private dustHistory: DustDto[] = [];
  private dustPrediction: DustDto[] = [];
  private id = 0;
  availableIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  selectedId = 0;

  constructor(
    private dustService: DustService,
    private router: Router,
    activatedRoute: ActivatedRoute) {
    this.id = activatedRoute.snapshot.params['id'];
    this.selectedId = this.id;
}

  ngOnInit() {
    this.updateDustData();
  }

  updateDustData() {
    const historyObservable = this.dustService.getDustHistory(this.id,  new Date(2010, 1, 1), new Date());
    const predictionObservable = this.dustService.getDustPrediction(this.id);
    forkJoin(historyObservable, predictionObservable).subscribe(
      result => {
        this.dustHistory = result[0];
        this.dustPrediction = result[1];
        this.showChart();
      },
      err => console.error(err)
    );
  }

  showChart() {
    const pipe = new DatePipe('en-us');
    const ctx = document.getElementById('canvas') as HTMLCanvasElement;
    const chart = new Chart(ctx.getContext('2d'), {
      type: 'line',
      data: {
        labels: this.dustHistory.map(dustdata => pipe.transform(dustdata.timestamp, 'medium')).concat(
                  this.dustPrediction.map(dustdata => pipe.transform(dustdata.timestamp, 'medium')) ),
        datasets: [
          {
            label: 'Dust 2.5',
            // backgroundColor: 'rgb(18, 99, 132)',
            borderColor: 'rgb(18, 99, 32)',
            data: (this.dustHistory.map(dustdata => dustdata.particulateMatter25))
            .concat(this.dustPrediction.map(dustdata => dustdata.particulateMatter25)),
          },
          {
            label: 'Dust 10.0',
            // backgroundColor: 'rgb(18, 3, 132)',
            borderColor: 'rgb(18, 3, 32)',
            data: (this.dustHistory.map(dustdata => dustdata.particulateMatter100))
            .concat(this.dustPrediction.map(dustdata => dustdata.particulateMatter100)),
          }]
      },
      options: {
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true,
            ticks: {
              min: 0,
              max: 200
            }
          }],
        }
      }
    });
  }

  onIdSelected() {
    if (this.id !== this.selectedId) {
      this.id = this.selectedId;
      this.updateDustData();
      this.router.navigate(['chart/' + this.selectedId]);
    }
   }
}
