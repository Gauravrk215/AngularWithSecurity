import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartConfiguration,  ChartDataset,  ChartOptions } from 'chart.js';
// import { Label } from 'ng2-charts';
import { DashboardContentModel } from 'src/app/models/builder/dashboard';
import { DashrunnerService } from '../dashrunner.service';
import { Dashboard3Service } from 'src/app/services/builder/dashboard3.service';

@Component({
  selector: 'app-bubble-runner',
  templateUrl: './bubble-runner.component.html',
  styleUrls: ['./bubble-runner.component.scss']
})
export class BubbleRunnerComponent implements OnInit {
  @ViewChild('contentContainer') contentContainerRef!: ElementRef;
  @Output() buttonClicked = new EventEmitter<void>();
  editId;
  public DashtestboardArray: DashboardContentModel[] = [
  ];
  workflowLine;
  TableName;
  XAxis;
  YAxis;
  showlabel;
  JsonData;
  lineChartNoLabels: [] = [];
  ChartLegend = false;
  
  constructor(private Dashtestservive:DashrunnerService,private route: ActivatedRoute,private dashboardService: Dashboard3Service,
    private router : Router,) { }
    
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
  ];
  ngOnInit(): void {
  // this.pieChartData = this.CharData.pieChartData;
    // this.pieChartLabels = this.CharData.pieChartLabels;

    this.editId = this.route.snapshot.params.id;
    console.log(this.editId);


    this.dashboardService.getById(this.editId).subscribe((data)=>{
      console.log(data);
      this.workflowLine = data.dashbord1_Line[0].model;
      const dash = JSON.parse(this.workflowLine) ;

      const ChartObject = dash.dashboard.filter(obj => obj.name === "Bubble Chart");
      console.log(ChartObject);
      for (let i = 0; i < ChartObject.length; i++) {
        const ids = this.Dashtestservive.getbubblechart();
        // console.log(ids);
        if (ids.includes(ChartObject[i].chartid)) {
          // If the chartid is already in the ids array, continue to the next iteration
          continue;
        }
        this.Dashtestservive.setbubblechart(ChartObject[i].chartid);
        const id = ids[i];
        console.log(id);
      
        if (ChartObject[i].chartid === id) {
          this.TableName = ChartObject[i].table;
          this.XAxis = ChartObject[i].xAxis;
          this.YAxis = ChartObject[i].yAxis;
          this.showlabel = ChartObject[i].showlabel;
          this.ChartLegend = ChartObject[i].chartlegend;
          console.log(this.TableName);
          this.Dashtestservive.getChartData(this.TableName,"Bubble Chart",this.XAxis,this.YAxis).subscribe((Ldata) => {
            console.log(Ldata);
            this.JsonData = Ldata;
            this.bubbleChartData = this.JsonData.bubbleChartData;
            // this.radarChartLabels = this.JsonData.radarChartLabels;
            
           },(error) => {
            console.log(error);
           });
          break; // No need to continue the loop once the correct placeholder is found
        }
      }
    });
  }

  generatePDFFile(){
    this.buttonClicked.emit();
    const content = this.contentContainerRef.nativeElement;
    const filename = 'bubblechart.pdf'; // You can provide any desired filename here

    this.Dashtestservive.generatePDF(content, filename);
  }


}
