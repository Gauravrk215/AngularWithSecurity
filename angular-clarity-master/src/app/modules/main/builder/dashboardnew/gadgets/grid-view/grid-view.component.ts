import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcelService } from 'src/app/services/excel.service';
import * as moment from 'moment';
import { UsergrpmaintainceService } from 'src/app/services/admin/usergrpmaintaince.service';
import { ToastrService } from 'ngx-toastr';
import { MenuGroupService } from 'src/app/services/admin/menu-group.service';
@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss']
})
export class GridViewComponent implements OnInit {
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
  ) { }

  ngOnInit(): void {
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
  }
}
