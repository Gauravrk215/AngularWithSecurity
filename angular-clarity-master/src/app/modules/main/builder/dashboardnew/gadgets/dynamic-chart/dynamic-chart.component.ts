import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData,  } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-dynamic-chart',
  templateUrl: './dynamic-chart.component.html',
  styleUrls: ['./dynamic-chart.component.scss']
})
export class DynamicChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.4
      }
    },
    // We use these empty structures as placeholders for dynamic theming.
    // scales: {
    //   x: {},
    //   y: {
    //     min: 10
    //   }
    // },
    plugins: {
      legend: { display: true },
    }
  };
  public dynamicChartLabels: string[] = [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ];
  public barChartType: string = 'bar';

  // public barChartData: ChartData<'bar'> = {
  //   labels: this.barChartLabels,
  //   datasets: [
  //     { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
  //     { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
  //   ]
  // };


	public dynamicChartData: any = [
		{ data: [65, 59, 90, 81, 56, 55, 40], label: "Series A" },
		{ data: [28, 48, 40, 19, 96, 27, 100], label: "Series B" }
	];

  // events
  public chartClicked(e: any): void {
		console.log(e);
	}

	public chartHovered(e: any): void {
		console.log(e);
	}
  // public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
  //   console.log(event, active);
  // }

  // public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
  //   console.log(event, active);
  // }

  public randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }
}
