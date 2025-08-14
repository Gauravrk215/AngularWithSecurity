import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DashrunnerService } from '../dashrunner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Dashboard3Service } from 'src/app/services/builder/dashboard3.service';
import { DashboardContentModel } from 'src/app/models/builder/dashboard';
// import { Label } from 'ng2-charts';

@Component({
  selector: 'app-polar-runner',
  templateUrl: './polar-runner.component.html',
  styleUrls: ['./polar-runner.component.scss']
})
export class PolarRunnerComponent implements OnInit {
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

  public polarAreaChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales' ];
  public polarAreaChartData: any = [
    { data: [ 300, 500, 100, 40, 120 ], label: 'Series 1'}
  ];

  public polarAreaChartType: string = 'polarArea';
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

      const ChartObject = dash.dashboard.filter(obj => obj.name === "Polar Area Chart");
      console.log(ChartObject);
      for (let i = 0; i < ChartObject.length; i++) {
        const ids = this.Dashtestservive.getpolarareachart();
        // console.log(ids);
        if (ids.includes(ChartObject[i].chartid)) {
          // If the chartid is already in the ids array, continue to the next iteration
          continue;
        }
        this.Dashtestservive.setpolarareachart(ChartObject[i].chartid);
        const id = ids[i];
        console.log(id);
      
        if (ChartObject[i].chartid === id) {
          this.TableName = ChartObject[i].table;
          this.XAxis = ChartObject[i].xAxis;
          this.YAxis = ChartObject[i].yAxis;
          this.showlabel = ChartObject[i].showlabel;
          this.ChartLegend = ChartObject[i].chartlegend;
          console.log(this.TableName);
          this.Dashtestservive.getChartData(this.TableName,"PolarArea Chart",this.XAxis,this.YAxis).subscribe((Ldata) => {
            console.log(Ldata);
            this.JsonData = Ldata;
            this.polarAreaChartData = this.JsonData.polarAreaChartData;
            this.polarAreaChartLabels = this.JsonData.polarAreaChartLabels;
            
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
    const filename = 'polarareachart.pdf'; // You can provide any desired filename here

    this.Dashtestservive.generatePDF(content, filename);
  }

}
