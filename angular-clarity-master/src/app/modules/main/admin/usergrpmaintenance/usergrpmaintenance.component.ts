import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcelService } from '../../../../services/excel.service';
import * as moment from 'moment';
import { UsergrpmaintainceService } from '../../../../services/admin/usergrpmaintaince.service';
import { ToastrService } from 'ngx-toastr';
import { MenuGroupService } from 'src/app/services/admin/menu-group.service';
import { CsvService } from 'src/app/services/csv.service';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from 'src/app/services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usergrpmaintenance',
  templateUrl: './usergrpmaintenance.component.html',
  styleUrls: ['./usergrpmaintenance.component.scss']
})
export class UsergrpmaintenanceComponent implements OnInit, OnDestroy {
  loading = false;
  public entryForm: FormGroup;
  givendata;
  orders;
  error;
  modalAdd= false;
  modaledit=false;
  modaldelete=false;
  rowSelected :any= {};
  mcreate: string | boolean = false;
  medit: string | boolean = false;
  showdata: any;
  submitted=false;
  filterText: string = '';
  viewMode: 'table' | 'cards' = 'cards';
  private themeSubscription: Subscription;

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
    private themeService: ThemeService,
  ) { }
  
  switchLanguage(language: string) {
    this.translate.use(language);
  }
  
  ngOnInit(): void {
    this.themeSubscription = this.themeService.currentTheme$.subscribe(() => {
      // Theme changes will automatically update CSS variables
      // This triggers a re-render of themed elements
    });
    
    this.showdata = this.menuGroupService.getdata();
    console.log('Showdata:', this.showdata);
    if (this.showdata) {
      // Handle both string and boolean values
      this.mcreate = this.showdata.mcreate === 'true' || this.showdata.mcreate === true ? true : false;
      this.medit = this.showdata.medit === 'true' || this.showdata.medit === true ? true : false;
      console.log('MCREATE:', this.mcreate);
      console.log('MEDIT:', this.medit);
    }

    this.mainservice.getAll().subscribe((data) => {
      console.log('Data received:', data);
      this.givendata = data || [];
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
  
  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }
  
  get totalGroups(): number {
    const list: any[] = (this.givendata as unknown as any[]) || [];
    return list.length;
  }

  
  get filteredGroups(): any[] {
    const items: any[] = (this.givendata as unknown as any[]) || [];
    const text = (this.filterText || '').toLowerCase();
    if (!text) { return items; }
    return items.filter(g => (
      (g?.groupName || '').toLowerCase().includes(text) ||
      (g?.groupDesc || '').toLowerCase().includes(text)
    ));
  }

  setViewMode(mode: 'table' | 'cards') { this.viewMode = mode; }
  onExport() {
    this.excel.exportAsExcelFile(this.givendata, 'user_',
      moment().format('YYYYMMDD_HHmmss'))
  }
  goToAdd() {
    this.modalAdd=true;
    //this.router.navigate(["../usermaintanceadd"],{relativeTo:this.route});
    }
  goToEdit(row){
    console.log('Edit clicked for row:', row);
    this.rowSelected = {...row}; // Create a copy to avoid reference issues
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
      console.log('Delete clicked for row:', row);
      this.rowSelected = {...row}; // Create a copy to avoid reference issues
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