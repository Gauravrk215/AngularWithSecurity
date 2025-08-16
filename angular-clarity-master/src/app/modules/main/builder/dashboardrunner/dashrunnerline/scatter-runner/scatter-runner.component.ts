import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DashrunnerService } from '../dashrunner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Dashboard3Service } from 'src/app/services/builder/dashboard3.service';
import { DashboardContentModel } from 'src/app/models/builder/dashboard';
// import { Label } from 'ng2-charts';
import { ChartDataset } from 'chart.js';

@Component({
  selector: 'app-scatter-runner',
  templateUrl: './scatter-runner.component.html',
  styleUrls: ['./scatter-runner.component.scss']
})
export class ScatterRunnerComponent implements OnInit {
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
  lineChartNoLabels: any[] = [];
  ChartLegend = false;
  
  constructor(private Dashtestservive:DashrunnerService,private route: ActivatedRoute,private dashboardService: Dashboard3Service,
    private router : Router,) { }

  public scatterChartLabels: string[] = [ 'Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running' ];

  public scatterChartData: ChartDataset[] = [
    {
      data: [
        { x: 1, y: 1 },
        { x: 2, y: 3 },
        { x: 3, y: -2 },
        { x: 4, y: 4 },
        { x: 5, y: -3, r: 20 },
      ],
      label: 'Series A', // This label will be displayed on hover
      pointRadius: 10,
      backgroundColor: 'red',
    },
    {
      data: [
        { x: 2, y: 2 },
        { x: 3, y: 4 },
        { x: 4, y: -1 },
        { x: 5, y: 5 },
        { x: 6, y: -2, r: 20 },
      ],
      label: 'Series B', // This label will be displayed on hover
      pointRadius: 10,
      backgroundColor: 'blue',
    },
  ];
  public scatterChartType: string = 'scatter';
  ChartOptions = {
    aspectRatio:2.5,
    responsive: true,
  };
  ngOnInit(): void {
 // this.pieChartData = this.CharData.pieChartData;
    // this.pieChartLabels = this.CharData.pieChartLabels;

    this.editId = this.route.snapshot.params.id;
    console.log(this.editId);


    this.dashboardService.getById(this.editId).subscribe((data)=>{
      console.log(data);
      this.workflowLine = data.dashbord1_Line[0].model;
      const dash = JSON.parse(this.workflowLine) ;

      const ChartObject = dash.dashboard.filter(obj => obj.name === "Scatter Chart");
      console.log(ChartObject);
      for (let i = 0; i < ChartObject.length; i++) {
        const ids = this.Dashtestservive.getscatterchart();
        // console.log(ids);
        if (ids.includes(ChartObject[i].chartid)) {
          // If the chartid is already in the ids array, continue to the next iteration
          continue;
        }
        this.Dashtestservive.setscatterchart(ChartObject[i].chartid);
        const id = ids[i];
        console.log(id);
      
        if (ChartObject[i].chartid === id) {
          this.TableName = ChartObject[i].table;
          this.XAxis = ChartObject[i].xAxis;
          this.YAxis = ChartObject[i].yAxis;
          this.showlabel = ChartObject[i].showlabel;
          this.ChartLegend = ChartObject[i].chartlegend;
          console.log(this.TableName);
          this.Dashtestservive.getChartData(this.TableName,"Scatter Chart",this.XAxis,this.YAxis).subscribe((Ldata) => {
            console.log(Ldata);
            this.JsonData = Ldata;
            this.scatterChartData = this.JsonData.scatterChartData;
            this.scatterChartLabels = this.JsonData.scatterChartLabels;
            
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
    const filename = 'scatterchart.pdf'; // You can provide any desired filename here

    this.Dashtestservive.generatePDF(content, filename);
  }

}
