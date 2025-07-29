import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public pieChartLabels: string[] = ['SciFi', 'Drama', 'Comedy'];
  public pieChartData: number[] = [30, 50, 20];
  public pieChartType: string = 'pie';

  // events
	public chartClicked(e: any): void {
		console.log(e);
	}

	public chartHovered(e: any): void {
		console.log(e);
	}

}
