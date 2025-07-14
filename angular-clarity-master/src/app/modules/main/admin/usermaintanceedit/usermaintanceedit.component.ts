import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccesstypeService } from 'src/app/services/admin/accesstype.service';
import { UsergrpmaintainceService } from 'src/app/services/admin/usergrpmaintaince.service';
import { UsermaintanceService } from '../../../../services/admin/usermaintance.service';
//import { Usermain } from 'src/app/models/usermaintaince';

@Component({
  selector: 'app-usermaintanceedit',
  templateUrl: './usermaintanceedit.component.html',
  styleUrls: ['./usermaintanceedit.component.scss']
})
export class UsermaintanceeditComponent implements OnInit {
  id:number;
  data1:any={};
  customer:boolean=false;
  custdata: any;
  clickedID:number;
  custiddata: any;
  loading = false;
  userobjcust={
    customerName:'',
    customerCode:'',
  }
  accessdata;
  department:boolean=false;
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
  position:boolean=false;
  usergrpdata;
  error;
  constructor(private route:ActivatedRoute,
    private mainservice:UsermaintanceService,
    private router: Router,private accesstype:AccesstypeService,
    private usergrpservice: UsergrpmaintainceService

   ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);
    this.getById(this.id);
    //
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
getById(id:number){
this.mainservice.getbyid(id).subscribe((data)=>{
  this.data1=data;
 // this.data1=this.data3;
  console.log(this.data1);
});
}
update(){
  console.log(this.data1);
  this.mainservice.updatenew(this.id,this.data1).subscribe((data)=>{
console.log(data);
  });

}
goback(){
  this.router.navigate(["../../usermaintance"], { relativeTo: this.route });
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
