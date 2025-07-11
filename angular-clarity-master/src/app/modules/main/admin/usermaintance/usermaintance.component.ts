import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcelService } from '../../../../services/excel.service';
import * as moment from 'moment';
import { UsermaintanceService } from '../../../../services/admin/usermaintance.service';
import { MenuGroupService } from 'src/app/services/admin/menu-group.service';
import { ToastrService } from 'ngx-toastr';
import { CsvService } from 'src/app/services/csv.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-usermaintance',
  templateUrl: './usermaintance.component.html',
  styleUrls: ['./usermaintance.component.scss']
})
export class UsermaintanceComponent implements OnInit {
  loading = false;
  loading1=false;
  public entryForm: FormGroup;
  givendata;
  orders;
  modalAdd= false;
  modaledit=false;
mcreate;
medit;
mdelete;
showdata;
error;
modaldelete=false;
rowSelected :any= {};
  constructor(private excel: ExcelService,
    private _fb: FormBuilder,
    private router: Router, private toastr:ToastrService,
    private route: ActivatedRoute,
    private menuGroupService: MenuGroupService,
    private mainservice:UsermaintanceService,
    private csvService: CsvService,
    private translate: TranslateService,
    ) {this.loading1 = true;
      setTimeout(() => {
        this.loading1 = false;
      }, 1000); }
      switchLanguage(language: string) {
        this.translate.use(language);
      }
  ngOnInit(): void {
    this.showdata = this.menuGroupService.getdata();
    console.log(this.showdata);
      this.mcreate=this.showdata.mcreate;
      console.log(this.mcreate);
      this.mdelete=this.showdata.mdelete
      console.log(this.mdelete);
      this.medit=this.showdata.medit
      console.log(this.medit);
    this.getData();

     }
  getData(){
    this.mainservice.getAll().subscribe((data) => {
      console.log(data);
      this.givendata = data;
      if(this.givendata.length==0){
        this.error="No data Available";
        console.log(this.error)
      }
      // for(let i =0;i<data.length;i++){
      //   // console.log(data[i]);
      //   // console.log(data[i].orderDetails);
      //   this.orders=(data[i].orderDetails);
      //   console.log(this.orders);
      // }


    },(error) => {
      console.log(error);
      if(error){
       this.error="Server Error";
     }
    });
  }


  // csv

  modalCsv = false;
  selectedFiles: File;
  fileList;
  ttype = 'usermaintenance';


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


  onExport() {
    this.excel.exportAsExcelFile(this.givendata, 'user_',
      moment().format('YYYYMMDD_HHmmss'))
  }
  goToAdd() {
    this.router.navigate(["../usermaintanceadd"],{relativeTo:this.route});
    }
  goToEdit(id: number){
        this.router.navigate(["../usermaintancedit/"+ id], { relativeTo: this.route });
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
}
