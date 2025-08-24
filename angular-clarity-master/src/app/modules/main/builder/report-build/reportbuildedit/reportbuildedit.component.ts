import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReportBuilderService } from 'src/app/services/api/report-builder.service';



@Component({
  selector: 'app-reportbuildedit',
  templateUrl: './reportbuildedit.component.html',
  styleUrls: ['./reportbuildedit.component.scss']
})
export class ReportbuildeditComponent implements OnInit {
  public entryForm: FormGroup;
  updated = false;
  ReportData:any = {};
  id: number;
  nodeEditProperties = {
    std_param_html:'',
    adhoc_param_html:'',
    column_str:'',
    conn_name:'',
    date_param_req:'',
    // folderName:'',
    sql_str:'',

};
  constructor(private router: Router,
    private route: ActivatedRoute,private reportBuilderService: ReportBuilderService,
    private toastr: ToastrService,  private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);

    this.entryForm = this._fb.group({
      std_param_html : [null],
      adhoc_param_html:[null],
      column_str:[null],
      conn_name:[null],
      date_param_req:[null],
      // folderName:[null],
      sql_str:[null],
      });

    this.getById(this.id);
    this.listoddatabase();
  }
  databaselist;
  listoddatabase(){
    this.reportBuilderService.getdatabse().subscribe((data)=>{
      this.databaselist=data;
      console.log(this.databaselist)
    },(error) => {
      console.log(error);
      if(error){
     }
    });
  
  }
  builderLine;
  lineId;
  builderLineData;
  getById(id: number) {
    this.reportBuilderService.getrbDetailsById(id).subscribe(
      (data) => {
        console.log(data);
        this.ReportData = data;

        
        this.builderLine = this.ReportData.rpt_builder2_lines;
        this.lineId = this.builderLine[0].id
        console.log("line data ",this.lineId, this.builderLine);
        if(this.builderLine[0].model != '')
        {
          this.builderLineData = JSON.parse(this.builderLine[0].model) ;
          console.log(this.builderLineData);

          this.nodeEditProperties.std_param_html = this.builderLineData.std_param_html;
          this.nodeEditProperties.adhoc_param_html = this.builderLineData.adhoc_param_html;
          this.nodeEditProperties.column_str = this.builderLineData.column_str;
          this.nodeEditProperties.conn_name = this.builderLineData.conn_name;
          this.nodeEditProperties.date_param_req = this.builderLineData.date_param_req;
          this.nodeEditProperties.sql_str = this.builderLineData.sql_str;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  listBuilder_Lines = {
    model:{}
  }
  update() {

    this.builderLineData.std_param_html = this.nodeEditProperties.std_param_html;
     this.builderLineData.adhoc_param_html = this.nodeEditProperties.adhoc_param_html;
     this.builderLineData.column_str =  this.nodeEditProperties.column_str;
     this.builderLineData.conn_name = this.nodeEditProperties.conn_name ;
    this.builderLineData.date_param_req = this.nodeEditProperties.date_param_req;
    this.builderLineData.sql_str = this.nodeEditProperties.sql_str;
    console.log(this.builderLineData);
    // this.builderLineData.splice(1);
    console.log(this.builderLineData);
    let tmp = JSON.stringify(this.builderLineData); //.replace(/\\/g, '')
    this.listBuilder_Lines.model = tmp;
console.log(this.listBuilder_Lines);

    this.reportBuilderService.updaterbLineData(this.listBuilder_Lines, this.lineId).subscribe(
      (data) => {
        console.log(data);
        if (data) {
          this.toastr.success('Update successfully');
       }
        this.router.navigate(["../../all"], { relativeTo: this.route });
        //this.router.navigate(["../../all"],{ relativeTo: this.route, queryParams: { p_id: this.projectId } });
      },
      (error) => {
        // console.log(error);
        // const objectArray = Object.entries(error.error.fieldErrors);
        // objectArray.forEach(([k, v]) => {
        //   console.log(k);
        //   console.log(v);
        //   this.fieldErors.push({ field: k, message: v });
        // });
        console.log(error); // this will come from backend
      }
    );
    // this.lineBuilder_Header = new Rn_Cff_ActionBuilder_Header();
  }

  onSubmit() {
    this.updated = true;
    this.update();
  }

  back() {
    this.router.navigate(["../../all"], { relativeTo: this.route });
  }

}
