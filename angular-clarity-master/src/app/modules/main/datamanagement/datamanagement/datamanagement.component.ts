import { HttpErrorResponse, HttpHeaderResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { DatamanagementService } from 'src/app/services/fnd/datamanagement.service';
import { UsermaintanceService } from 'src/app/services/admin/usermaintance.service';
import { ExcelService } from 'src/app/services/excel.service';
import { BulkimportService } from 'src/app/services/fnd/bulkimport.service';
@Component({
  selector: 'app-datamanagement',
  templateUrl: './datamanagement.component.html',
  styleUrls: ['./datamanagement.component.scss']
})
export class DatamanagementComponent implements OnInit {
  rowSelected: any = {};
  modaldelete = false;
  modalEdit = false;
  modalAdd = false;
  public entryForm: FormGroup;
  selected: any[] = [];
  error;
  loading = false;
  data;
  udata;
  selectedFile: File[] = [];
  entitydata;
  // tableList =['priority','impact','urgency','category','state','contact_type','customer','handler'];
  tableList;
  constructor(private excel: ExcelService, private datamservice: DatamanagementService, private toastr: ToastrService,
    private _fb: FormBuilder, private userservice: UsermaintanceService, private router: Router, private bulkimportService: BulkimportService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getall();
    // this.getuserall();
    this.allentity();
    this.entitygetall();
    this.entryForm = this._fb.group({
      user_id: [null],
      file_name: [null],
      entityName: [null],
      //  entity_name:[null],
      file_type: [null],

    });
    // this.datamservice.getjson().subscribe((data)=>{
    //   console.log(data);
    // })
  }
  getall() {
    this.datamservice.getall().subscribe((data) => {
      console.log('data managemnt ', data);
      this.data = data;
      if (this.data.length == 0) {
        this.error = "No data Available";
        console.log(this.error);
      }

    }, (error) => {
      console.log(error);
      if (error) {
        this.error = "No data Available OR server Error";
      }
    });
  }

  entitygetall() {
    this.bulkimportService.getDetails().subscribe((data) => {
      console.log(data);
      this.tableList = data;
    }, (error) => {
      console.log(error);
    });
  }


  getuserall() {
    this.userservice.getAll().subscribe((data) => {
      console.log(data);
      this.udata = data;
    })
  }
  allentity() {
    // this.datamservice.getallentity().subscribe((data)=>{
    //   console.log(data);
    //   this.entitydata=data;
    // }, (error: HttpHeaderResponse)=>{
    //   console.log(error);
    // })
  }
  onExport() {
    this.excel.exportAsExcelFile(this.data, 'user_',
      moment().format('YYYYMMDD_HHmmss'))
  }
  public onFileChanged(event) {
    //Select File
    console.log(event);
    this.selectedFile = event.target.files[0];

  }
  goToAdd() {
    this.modalAdd = true;
  }
  onSubmit() {
    console.log(this.entryForm.value);
    this.datamservice.create(this.selectedFile, this.entryForm.value.entityName).subscribe((data) => {
      console.log(data);
      if (data.status === 202) {
        this.toastr.success("Added Succesfully");
      }
      setTimeout(() => {
        this.getall();
      }, 1000);
      this.getall();
    }, (error: HttpErrorResponse) => {
      console.log(error);
      if (error.status >= 200 && error.status <= 299) {
        this.toastr.success("Added Succesfully");
        setTimeout(() => {
          this.getall();
        }, 1000);
      }
      if (error.status === 404) {
        this.toastr.error("Not Added");
      }
      this.ngOnInit();
    });
    this.modalAdd = false;
  }
  onEdit(row) {
    this.rowSelected = row;
    this.modalEdit = true;
  }

  onDelete(row) {
    this.rowSelected = row;
    this.modaldelete = true;
  }

  delete(id) {
    this.modaldelete = false;
    console.log("in delete  " + id);
    this.datamservice.delete(id).subscribe(
      (data) => {
        console.log(data);

        this.ngOnInit();

        if (data.status >= 200 && data.status <= 299 || data == null) {
          this.toastr.success("Delete Succesfully");
        }
      }, (error: HttpHeaderResponse) => {
        console.log(error);
        if (error.status >= 200 && error.status <= 299) {
          this.toastr.success("Delete Succesfully");
        }
        if (error.status >= 400 && error.status <= 499) {
          this.toastr.error("Not Delete");
        }
        if (error.status >= 500 && error.status <= 599) {
          this.toastr.error("Server Error");
        }
      });
    this.ngOnInit();
  }
  onUpdate(id) {
    this.modalEdit = false;
    this.datamservice.update(id, this.rowSelected, this.selectedFile).subscribe(
      (data) => {
        console.log(data);
        if (data.status === 202) {
          this.toastr.success("Updated Succesfully");
        }

      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
    this.ngOnInit();
  }
  work(id: any) {
    console.log(id);
    this.router.navigate(["../dataworkflow/" + id], { relativeTo: this.route });
  }
}
