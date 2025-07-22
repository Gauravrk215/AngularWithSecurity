import { Component, OnInit } from '@angular/core';
import { ChartConfiguration,  ChartDataset,  ChartOptions } from 'chart.js';
@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.scss']
})
export class BubbleChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public bubbleChartOptions: ChartConfiguration['options'] = {
    // scales: {
    //   x: {
    //     min: 0,
    //     max: 30,
    //     ticks: {}
    //   },
    //   y: {
    //     min: 0,
    //     max: 30,
    //     ticks: {}
    //   },
    //   plugins: {
    //     title: {
    //       display: true,
    //       text: 'Bubble Chart'
    //     }
    //   }
    // }
  };

  public bubbleChartType: string = 'bubble';
 // public bubbleChartLegend = true;
  public bubbleChartData: ChartDataset[] = [
    {
      data: [
        { x: 10, y: 10, r: 10 },
        { x: 15, y: 5, r: 15 },
        { x: 26, y: 12, r: 23 },
        { x: 7, y: 8, r: 8 },
      ],
      label: 'Investment Equities',
      backgroundColor: 'rgba(255, 0, 0, 0.6)', // Red
      borderColor: 'blue',
      hoverBackgroundColor: 'purple',
      hoverBorderColor: 'red',
    },
    {
      data: [
        { x: 5, y: 15, r: 12 },
        { x: 20, y: 7, r: 8 },
        { x: 12, y: 18, r: 15 },
        { x: 8, y: 6, r: 10 },
      ],
      label: 'Investment Bonds',
      backgroundColor: 'rgba(0, 255, 0, 0.6)', // Green
      borderColor: 'green',
      hoverBackgroundColor: 'yellow',
      hoverBorderColor: 'blue',
    },
    // {
    //   data: [
    //     { x: 10, y: 10, r: 10 },
    //     { x: 15, y: 5, r: 15 },
    //     { x: 26, y: 12, r: 23 },
    //     { x: 7, y: 8, r: 8 },
    //   ],
    //   label: 'Investment Equities',
    //   backgroundColor: [
    //     'red',
    //     'green',
    //     'blue',
    //     'purple',
    //     'yellow',
    //     'brown',
    //     'magenta',
    //     'cyan',
    //     'orange',
    //     'pink'
    //   ],
    //   borderColor: 'blue',
    //   hoverBackgroundColor: 'purple',
    //   hoverBorderColor: 'red',
    // },
  ];

   // events
	public chartClicked(e: any): void {
		console.log(e);
	}

	public chartHovered(e: any): void {
		console.log(e);
	}
}
