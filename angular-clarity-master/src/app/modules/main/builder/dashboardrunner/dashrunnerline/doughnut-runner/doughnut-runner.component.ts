import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DashrunnerService } from '../dashrunner.service';
import {baseColors } from 'ng2-charts';
import { ChartDataset, ChartType,   } from 'chart.js';
import { ActivatedRoute, Router } from '@angular/router';
import { Dashboard3Service } from 'src/app/services/builder/dashboard3.service';
import { DashboardContentModel } from 'src/app/models/builder/dashboard';

@Component({
  selector: 'app-doughnut-runner',
  templateUrl: './doughnut-runner.component.html',
  styleUrls: ['./doughnut-runner.component.scss']
})
export class DoughnutRunnerComponent implements OnInit {
  @ViewChild('contentContainer') contentContainerRef!: ElementRef;
  editId;
  public DashtestboardArray: DashboardContentModel[] = [
  ];
  workflowLine;
  TableName;
  XAxis;
  YAxis;
  showlabel;
  lineChartNoLabels:any[] = [];
  JsonData;
  
  doughnutD;
  doughnutChartData:any = [];
  doughnutChartLabels: any[] = [];
  doughnutChartLegend = false;
  doughnutData ={
    "chartData": [[55, 25, 20]],
    "chartLabels": ["Project", "Repository", "Wireframe"]
  }
  doughnutChartType: ChartType = 'doughnut';
  
    
    constructor(private Dashtestservive:DashrunnerService,private route: ActivatedRoute,private dashboardService: Dashboard3Service,
      private router : Router,) { }
  ngOnInit(): void {
    this.doughnutChartData = this.doughnutData.chartData;
    this.doughnutChartLabels = this.doughnutData.chartLabels;

    this.editId = this.route.snapshot.params.id;
    console.log(this.editId);

    this.dashboardService.getById(this.editId).subscribe((data)=>{
      console.log(data);
      this.workflowLine = data.dashbord1_Line[0].model;
      const dash = JSON.parse(this.workflowLine) ;
      // this.DashtestboardArray = dash.dashboard;
      // console.log(this.DashtestboardArray);

      const ChartObject = dash.dashboard.filter(obj => obj.name === "Doughnut Chart");
      console.log(ChartObject);
      for (let i = 0; i < ChartObject.length; i++) {
        const ids = this.Dashtestservive.getdoughnutchart();
        // console.log(ids);
        if (ids.includes(ChartObject[i].chartid)) {
          // If the chartid is already in the ids array, continue to the next iteration
          continue;
        }
        this.Dashtestservive.setdoughnutchart(ChartObject[i].chartid);
        const id = ids[i];
        console.log(id);
      
        if (ChartObject[i].chartid === id) {
          this.TableName = ChartObject[i].table;
          this.XAxis = ChartObject[i].xAxis;
          this.YAxis = ChartObject[i].yAxis;
          this.showlabel = ChartObject[i].showlabel;
          this.doughnutChartLegend = ChartObject[i].chartlegend;
          console.log(this.TableName);
          this.Dashtestservive.getChartData(this.TableName,"Doughnut Chart",this.XAxis,this.YAxis).subscribe((Ldata) => {
            console.log(Ldata);
            this.JsonData = Ldata;
            this.doughnutChartData = this.JsonData.chartData;
            this.doughnutChartLabels = this.JsonData.chartLabels;
            
           },(error) => {
            console.log(error);
           });
          break; // No need to continue the loop once the correct placeholder is found
        }
      }
    });
  }

  generatePDFFile(){
    // this.buttonClicked.emit();
    const content = this.contentContainerRef.nativeElement;
    const filename = 'doughnut.pdf'; // You can provide any desired filename here

    this.Dashtestservive.generatePDF(content, filename);
  }



}