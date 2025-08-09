import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DashrunnerService } from '../dashrunner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Dashboard3Service } from 'src/app/services/builder/dashboard3.service';
import { DashboardContentModel } from 'src/app/models/builder/dashboard';

@Component({
  selector: 'app-bar-runner',
  templateUrl: './bar-runner.component.html',
  styleUrls: ['./bar-runner.component.scss']
})
export class BarRunnerComponent implements OnInit {
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
  lineChartNoLabels:any[] = [];
  JsonData;

  barData;
  constructor(private Dashtestservive:DashrunnerService,private route: ActivatedRoute,private dashboardService: Dashboard3Service,
    private router : Router,) { }

  barChartLabels: any[] = [];
  barChartType: string = 'bar';
 barChartLegend = false;
  barChartPlugins = [];
  barChartData: any[] = [];

  CharData = {
    "barChartData": [
      { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits' },
    ],
    "barChartLabels":['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes']
  }

  ngOnInit(): void {
    this.barChartData = this.CharData.barChartData;
      this.barChartLabels = this.CharData.barChartLabels;

      this.editId = this.route.snapshot.params.id;
      console.log(this.editId);


      this.dashboardService.getById(this.editId).subscribe((data)=>{
        console.log(data);
        this.workflowLine = data.dashbord1_Line[0].model;
        const dash = JSON.parse(this.workflowLine) ;
        // this.DashtestboardArray = dash.dashboard;
        // console.log(this.DashtestboardArray);

        const ChartObject = dash.dashboard.filter(obj => obj.name === "Bar Chart");
        console.log(ChartObject);
        for (let i = 0; i < ChartObject.length; i++) {
          const ids = this.Dashtestservive.getbarchart();
          // console.log(ids);
          if (ids.includes(ChartObject[i].chartid)) {
            // If the chartid is already in the ids array, continue to the next iteration
            continue;
          }
          this.Dashtestservive.setbarchart(ChartObject[i].chartid);
          const id = ids[i];
          console.log(id);
        
          if (ChartObject[i].chartid === id) {
            this.TableName = ChartObject[i].table;
            this.XAxis = ChartObject[i].xAxis;
            this.YAxis = ChartObject[i].yAxis;
            this.showlabel = ChartObject[i].showlabel;
            this.barChartLegend = ChartObject[i].chartlegend;
            console.log(this.TableName);
            this.Dashtestservive.getChartData(this.TableName,"Bar Chart",this.XAxis,this.YAxis).subscribe((Ldata) => {
              console.log(Ldata);
              this.JsonData = Ldata;
              this.barChartData = this.JsonData.barChartData;
              this.barChartLabels = this.JsonData.barChartLabels;
              
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
    const filename = 'barchart.pdf'; // You can provide any desired filename here

    this.Dashtestservive.generatePDF(content, filename);
  }

}
