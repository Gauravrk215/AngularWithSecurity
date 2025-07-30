import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-polar-chart',
  templateUrl: './polar-chart.component.html',
  styleUrls: ['./polar-chart.component.scss']
})
export class PolarChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public polarAreaChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales' ];
  public polarAreaChartData: any = [
    { data: [ 300, 500, 100, 40, 120 ], label: 'Series 1'}
  ];

  public polarAreaChartType: string = 'polarArea';



	// public radarChartData: any = [
	// 	{ data: [65, 59, 90, 81, 56, 55, 40], label: "Series A" },
	// 	{ data: [28, 48, 40, 19, 96, 27, 100], label: "Series B" }
	// ];

  // events
	public chartClicked(e: any): void {
		console.log(e);
	}

	public chartHovered(e: any): void {
		console.log(e);
	}

}
