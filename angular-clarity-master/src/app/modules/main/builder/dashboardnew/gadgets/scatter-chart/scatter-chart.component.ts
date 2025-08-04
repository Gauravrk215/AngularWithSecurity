import { Component, OnInit } from '@angular/core';
import { ChartData,ChartDataset } from 'chart.js';

@Component({
  selector: 'app-scatter-chart',
  templateUrl: './scatter-chart.component.html',
  styleUrls: ['./scatter-chart.component.scss']
})
export class ScatterChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public scatterChartLabels: string[] = [ 'Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running' ];

  public scatterChartData: ChartDataset[] = [
  //   {
  //   data: [
  //     { x: 1, y: 1 },
  //     { x: 2, y: 3 },
  //     { x: 3, y: -2 },
  //     { x: 4, y: 4 },
  //     { x: 5, y: -3, r: 20 },
  //   ],
  //   label: 'Series A',
  //   pointRadius: 10,
  //   backgroundColor: 'red',
  // },
  // {
  //   data: [
  //     { x: 2, y: 2 },
  //     { x: 3, y: 1 },
  //     { x: 4, y: 3 },
  //     { x: 5, y: 2 },
  //     { x: 6, y: 4, r: 15 },
  //   ],
  //   label: 'Series B',
  //   pointRadius: 8,
  //   backgroundColor: 'green',
  // },
    {
      data: [
        { x: 1, y: 1 },
        { x: 2, y: 3 },
        { x: 3, y: -2 },
        { x: 4, y: 4 },
        { x: 5, y: -3, r: 20 },
      ],
      label: 'Series A',
      pointRadius: 10,
      backgroundColor: [
        'red',
        'green',
        'blue',
        'purple',
        'yellow',
        'brown',
        'magenta',
        'cyan',
        'orange',
        'pink'
      ],
    },
  ];
  public scatterChartType: string = 'scatter';


   // events
	public chartClicked(e: any): void {
		console.log(e);
	}

	public chartHovered(e: any): void {
		console.log(e);
	}
}
