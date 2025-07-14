import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccesstypeService } from 'src/app/services/admin/accesstype.service';
import { UsergrpmaintainceService } from 'src/app/services/admin/usergrpmaintaince.service';
import { UsermaintanceService } from '../../../../services/admin/usermaintance.service';

@Component({
  selector: 'app-usermaintanceadd',
  templateUrl: './usermaintanceadd.component.html',
  styleUrls: ['./usermaintanceadd.component.scss']
})
export class UsermaintanceaddComponent implements OnInit {
  public entryForm: FormGroup;
  customer:boolean=false;
  department:boolean=false;
  position:boolean=false;
  custdata: any;
  loading = false;
  clickedID:number;
  custiddata: any;
  userobjcust={
    customerName:'',
    customerCode:'',
  }
  departmentdata: any;
  positiondata: any;
  deptiddata: any;
  userobjdept={
    departmentCode:'',
  }
  userobjpos={
    positionCode:'',
  }
  posiddata: any;
  usergrpdata;
  accessdata;
  error;
  submitted=false;

  constructor( private _fb: FormBuilder,
    private mainservice:UsermaintanceService,
    private router: Router,private accesstype:AccesstypeService,
    private route: ActivatedRoute,
    private usergrpservice: UsergrpmaintainceService
    ) { }

  ngOnInit(): void {
    this.entryForm = this._fb.group({
      first_name :['',[Validators.required]],
      last_name:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      mob_no:['',[Validators.required]],
      new_password:['',[Validators.required,Validators.minLength(6)]],
      confirm_passwordS:['',[Validators.required]],
      usrGrpId:['',[Validators.required]],
      account_id:1,
      accesstype:['',[Validators.required]],
     // status:[null],
      // username:[null] ,
      // userPassw:[null] ,
      // confirmPassword:[null],
      // title:[null],
      // shortName:[null],
      // fullName:[null],
      // status:[null],
      // positionCodeString:[null],
      // departmentCodeString:[null],
      // usrGrpId:[null],
      // customerId:[null],
      // email:[null],
      // notification:[null],

      //departmentCode: this._fb.array([this.department()]),
     // positionCode: this._fb.array([this.position()]),
      //usrGrp: this._fb.array([this.user()]),

      }, {
        validator: ConfirmedValidator('new_password', 'confirm_passwordS')
      });
      this.usergrp();
      this.getdata();
  }
  getdata(){
    this.accesstype.getAll().subscribe(resp => {
      this.accessdata = resp;
      console.log('accessdata: ', this.accessdata);
      if(this.accessdata.length==0){
        this.error="No data Available";
        console.log(this.error)
      }
  },(error) => {
    console.log(error);
    if(error){
     this.error="Server Error";
   }
  })
  }
  usergrp(){
    this.usergrpservice.getAll().subscribe((data) => {
      console.log(data);
      this.usergrpdata = data;
    });
  }
  // department(){
  //   return this._fb.group({
  //     departmentCode:[null] ,

  //   });
  // }
  // position(){
  //   return this._fb.group({
  //     positionCode:[null] ,

  //   });
  // }
  // user(){
  //   return this._fb.group({
  //     usrGrp:[null] ,

  //   });
  //}
  onSubmit(){
    this.submitted=true
      if (this.entryForm.invalid) {
        return;
      }
    console.log(this.entryForm.value);
    this.mainservice.create(this.entryForm.value).subscribe(data => {
      console.log(data)
    },
      (error) => {
        console.log(error);
      }
    );
    this.router.navigate(["../usermaintance"], { relativeTo: this.route });
  }

goback(){
  this.router.navigate(["../usermaintance"], { relativeTo: this.route });
}
    gotodepartmet(){
      this.department=!this.department;
      this.mainservice.getalldepartment().subscribe((data)=>{
        console.log(data);
        this.departmentdata=data;
      });
    }
    getdepid(id:number){
      this.clickedID=id;
      console.log("clicked by id"+ id);
      this.mainservice.getbydepartmentid(id).subscribe((data) => {
        console.log(data);
        this.deptiddata= data;
       // this.userObj= this.custiddata;
        this.userobjdept =this.deptiddata;


        });
        this.department=false;
    }
    gotoposition(){
      this.position=!this.position;
      this.mainservice.getallposition().subscribe((data)=>{
        console.log(data);
        this.positiondata=data;
      })
    }
    getposid(id:number){
      this.clickedID=id;
      console.log("clicked by id"+ id);
      this.mainservice.getbypositionid(id).subscribe((data) => {
        console.log(data);
        this.posiddata= data;
       // this.userObj= this.custiddata;
        this.userobjpos =this.posiddata;


        });
        this.position=false;
    }


}
export function ConfirmedValidator(controlName: string, matchingControlName: string){
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
          return;
      }
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ confirmedValidator: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}
