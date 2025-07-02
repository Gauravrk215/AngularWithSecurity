import { Component, OnInit } from '@angular/core';
import { SessionloggerService } from 'src/app/services/admin/sessionlogger.service';
import * as moment from 'moment';
import { ExcelService } from 'src/app/services/excel.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-sessionlogger',
  templateUrl: './sessionlogger.component.html',
  styleUrls: ['./sessionlogger.component.scss']
})
export class SessionloggerComponent implements OnInit {
  loading = false;
  error;
  data;
  modaldelete=false;
  rowSelected :any= {};
  constructor(private sessionservice:SessionloggerService,private excel: ExcelService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.getdata();
  }
  getdata(){
    this.sessionservice.getAll().subscribe((data)=>{
      this.data=data;
      console.log(this.data);
      if(this.data.length==0){
        this.error="No data Available plz add if Required";
        console.log(this.error)
      }
    },(error) => {
      console.log(error);
      if(error){
       this.error="server Error";
     }
    });


  }
  onExport(){
    this.excel.exportAsExcelFile(this.data, 'user_',
    moment().format('YYYYMMDD_HHmmss'))
  }
  modaldel(row){
    this.rowSelected = row;
    this.modaldelete=true;
    console.log(this.rowSelected);
  }
  delete(id)
  {
    console.log("in delete  "+id);
    this.sessionservice.delete(id).subscribe(
      (data) => {
        console.log(data);
        //this.ngOnInit();
      },(error:HttpErrorResponse) => {
        console.log(error);
        if(error.status==200){
         this.toastr.success(error.error.text);
       }
       if(error.status==404){
        this.toastr.error(error.error);
      }

      });
      this.modaldelete=false;
  }
}
