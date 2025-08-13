import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DashrunnerService } from '../dashrunner.service';
import { DashboardContentModel } from 'src/app/models/builder/dashboard';
import { ActivatedRoute, Router } from '@angular/router';
import { Dashboard3Service } from 'src/app/services/builder/dashboard3.service';

@Component({
  selector: 'app-grid-runner',
  templateUrl: './grid-runner.component.html',
  styleUrls: ['./grid-runner.component.scss']
})
export class GridRunnerComponent implements OnInit {
  @ViewChild('contentContainer') contentContainerRef!: ElementRef;
  @Output() buttonClicked = new EventEmitter<void>();
  loading = false;
  givendata;
  error;
  XAxis;
  YAxis;

  rows:any[];
  columns: any[];
  rowdata;

  editId;
  public DashtestboardArray: DashboardContentModel[] = [];
  workflowLine;
  TableName;

  constructor(
    private Dashtestservive:DashrunnerService,private route: ActivatedRoute,private dashboardService: Dashboard3Service,
    private router : Router
  ) { }

  ngOnInit(): void {

    this.editId = this.route.snapshot.params.id;
    console.log(this.editId);
    // this.getbyId();

    this.dashboardService.getById(this.editId).subscribe((data)=>{
      console.log(data);
      this.workflowLine = data.dashbord1_Line[0].model;
      const dash = JSON.parse(this.workflowLine) ;
      // this.DashtestboardArray = dash.dashboard;
      // console.log(this.DashtestboardArray);

      const ChartObject = dash.dashboard.filter(obj => obj.name === "Grid View");
      console.log(ChartObject);
      for (let i = 0; i < ChartObject.length; i++) {
        const ids = this.Dashtestservive.getgridview();
        // console.log(ids);
        if (ids.includes(ChartObject[i].chartid)) {
          // If the chartid is already in the ids array, continue to the next iteration
          continue;
        }
        this.Dashtestservive.setgridview(ChartObject[i].chartid);
        const id = ids[i];
        console.log(id);
      
        if (ChartObject[i].chartid === id) {
          this.TableName = ChartObject[i].table;
          this.XAxis = ChartObject[i].xAxis;
          this.YAxis = ChartObject[i].yAxis;
          console.log(this.TableName);
          this.Dashtestservive.getChartData(this.TableName,"Grid View",this.XAxis,this.YAxis).subscribe((Ldata) => {
            console.log(Ldata);
            this.rows = Ldata;
            this.rowdata = this.rows
            
           },(error) => {
            console.log(error);
           });
          break; // No need to continue the loop once the correct placeholder is found
        }
      }
    });
  }


  
//dynamic table


getTableData(id){
}
getHeaders() {
let headers: string[] = [];
if(this.rows) {
  this.rows.forEach((value) => {
    Object.keys(value).forEach((key) => {
      if(!headers.find((header) => header == key)){
        headers.push(key)
      }

    })

  })
}
return headers;
}

generatePDFFile(){
  this.buttonClicked.emit();
  const content = this.contentContainerRef.nativeElement;
  const filename = 'gridview.pdf'; // You can provide any desired filename here

  this.Dashtestservive.generatePDF(content, filename);
}
}

