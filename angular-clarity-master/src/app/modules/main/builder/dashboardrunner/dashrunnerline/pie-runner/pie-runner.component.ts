import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DashrunnerService } from '../dashrunner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Dashboard3Service } from 'src/app/services/builder/dashboard3.service';
import { DashboardContentModel } from 'src/app/models/builder/dashboard';


@Component({
  selector: 'app-pie-runner',
  templateUrl: './pie-runner.component.html',
  styleUrls: ['./pie-runner.component.scss']
})
export class PieRunnerComponent implements OnInit {
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
  
  constructor(private Dashtestservive:DashrunnerService,private route: ActivatedRoute,private dashboardService: Dashboard3Service,
    private router : Router,) { }

  public pieChartLabels: string[] = ['SciFi', 'Drama', 'Comedy'];
  public pieChartData: number[] = [30, 50, 20];
  public pieChartType: string = 'pie';
  ChartLegend = false;

  ngOnInit(): void {
    // this.pieChartData = this.CharData.pieChartData;
    // this.pieChartLabels = this.CharData.pieChartLabels;

    this.editId = this.route.snapshot.params.id;
    console.log(this.editId);


    this.dashboardService.getById(this.editId).subscribe((data)=>{
      console.log(data);
      this.workflowLine = data.dashbord1_Line[0].model;
      const dash = JSON.parse(this.workflowLine) ;
      // this.DashtestboardArray = dash.dashboard;
      // console.log(this.DashtestboardArray);

      const ChartObject = dash.dashboard.filter(obj => obj.name === "Pie Chart");
      console.log(ChartObject);
      for (let i = 0; i < ChartObject.length; i++) {
        const ids = this.Dashtestservive.getpiechart();
        // console.log(ids);
        if (ids.includes(ChartObject[i].chartid)) {
          // If the chartid is already in the ids array, continue to the next iteration
          continue;
        }
        this.Dashtestservive.setpiechart(ChartObject[i].chartid);
        const id = ids[i];
        console.log(id);
      
        if (ChartObject[i].chartid === id) {
          this.TableName = ChartObject[i].table;
          this.XAxis = ChartObject[i].xAxis;
          this.YAxis = ChartObject[i].yAxis;
          this.showlabel = ChartObject[i].showlabel;
          this.ChartLegend = ChartObject[i].chartlegend;
          console.log(this.TableName);
          this.Dashtestservive.getChartData(this.TableName,"Pie Chart",this.XAxis,this.YAxis).subscribe((Ldata) => {
            console.log(Ldata);
            this.JsonData = Ldata;
            this.pieChartData = this.JsonData.pieChartData;
            this.pieChartLabels = this.JsonData.pieChartLabels;
            
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
    const filename = 'piechart.pdf'; // You can provide any desired filename here

    this.Dashtestservive.generatePDF(content, filename);
  }
}
