import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcelService } from '../../../../services/excel.service';
import * as moment from 'moment';
import { UsergrpmaintainceService } from '../../../../services/admin/usergrpmaintaince.service';
import { ToastrService } from 'ngx-toastr';
import { MenuGroupService } from 'src/app/services/admin/menu-group.service';
import { CsvService } from 'src/app/services/csv.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-usergrpmaintenance',
  templateUrl: './usergrpmaintenance.component.html',
  styleUrls: ['./usergrpmaintenance.component.scss']
})
export class UsergrpmaintenanceComponent implements OnInit {
  loading = false;
  public entryForm: FormGroup;
  givendata;
  orders;
  error;
  modalAdd= false;
  modaledit=false;
  modaldelete=false;
  rowSelected :any= {};
  mcreate;
  medit;
  showdata;
  submitted=false;

  constructor(
    private excel: ExcelService,
    private toastr:ToastrService,
    private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private menuGroupService: MenuGroupService,
    private mainservice:UsergrpmaintainceService,
    private csvService: CsvService,
    private translate: TranslateService,
  ) { }
  switchLanguage(language: string) {
    this.translate.use(language);
  }
  ngOnInit(): void {
    this.showdata = this.menuGroupService.getdata();
    console.log(this.showdata);
      this.mcreate=this.showdata.mcreate;
      console.log(this.mcreate);
      this.medit=this.showdata.medit
      console.log(this.medit);

    this.mainservice.getAll().subscribe((data) => {
      console.log(data);
      this.givendata = data;
      if(this.givendata.length==0){
        this.error="No data Available";
        console.log(this.error)
      }
    },(error) => {
      console.log(error);
      if(error){
       this.error="Server Error";
     }
    });

    this.entryForm = this._fb.group({
      groupName:['',[Validators.required]] ,
      groupDesc:['',[Validators.required]] ,
      groupLevel:['',[Validators.required]] ,
      status:['',[Validators.required]] ,

      });
  }
  onExport() {
    this.excel.exportAsExcelFile(this.givendata, 'user_',
      moment().format('YYYYMMDD_HHmmss'))
  }
  goToAdd() {
    this.modalAdd=true;
    //this.router.navigate(["../usermaintanceadd"],{relativeTo:this.route});
    }
  goToEdit(row){
    this.rowSelected = row;
    this.modaledit=true;
        //this.router.navigate(["../usermaintanceedit/"+ id], { relativeTo: this.route });
      }
      onUpdate(id) {
        this.modaledit = false;
           //console.log("in update");
        console.log("id  "+id);
        console.log( this.rowSelected );
        //console.log("out update");
        this.mainservice.update(this.rowSelected).subscribe(
          (data) => {
            console.log(data);
            if (data) {
              this.toastr.success('Updated successfully');
                  }
          }, (error) => {
            console.log(error);
            if(error){
             this.toastr.error('Not Updated Data Getting Some Error');
           }
          }
        );
    }
    onSubmit() {
      console.log(this.entryForm.value);
      this.submitted=true;
      if (this.entryForm.invalid) {
        return;
      }
      this.onCreate();
    }
    onCreate() {
        this.modalAdd=false;
       this.mainservice.create(this.entryForm.value).subscribe(data => {
         console.log(data)
         this.ngOnInit();
         if (data) {
          this.toastr.success('Added successfully');
              }
       },
         (error) => {
           console.log(error);
           if(error){
            this.toastr.error('Not Added Data Getting Some Error');
          }
         }
       );
      //  if (this.entryForm.value) {
      //    this.toastr.success('Added successfully');

      //  }
     }
     onDelete(row) {
      this.rowSelected = row;
       this.modaldelete=true;
    }

    delete(id)
    {
      this.modaldelete = false;
      console.log("in delete  "+id);
      this.mainservice.deleteusr(id).subscribe(
        (data) => {
          console.log(data);
          this.ngOnInit();
          if (data) {
            this.toastr.success('Deleted successfully');
                }
        },
        (error) => {
          console.log('Error in adding data...',+error);
          if(error){
            this.toastr.error('Not Deleted Data Getting Some Error');
          }
        }
      );


    }


    
  // csv

  modalCsv = false;
  selectedFiles: File;
  fileList;
  ttype = 'usergroupmaintenance';


  // Import CSV
  public selectFile(event) {
    this.selectedFiles = event.target.files[0];
    // this.saveCsv();
  }

  csvImport() {
    console.log("import CSV");
    this.modalCsv = true;
  }
  saveCsv() {
    this.csvService.importCsv(this.selectedFiles, this.ttype).subscribe(data => {
      console.log(data);
      this.fileList = data;
      this.modalCsv = false;
    },
      (error) => {
        console.log(error);
        if (error.status == 202) {
          this.toastr.success(error.error.text)
        }
      });
  }

  downloadFiles() {
    this.csvService.downloadCsvs(this.ttype);

  }
}
