import { HttpErrorResponse, HttpHeaderResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BulkimportService } from 'src/app/services/fnd/bulkimport.service';

@Component({
  selector: 'app-bulkimportedit',
  templateUrl: './bulkimportedit.component.html',
  styleUrls: ['./bulkimportedit.component.scss']
})
export class BulkimporteditComponent implements OnInit {
  public entryForm: FormGroup;
  selectedFile: File[]=[];
  id;
  datajson;
  transform:boolean = false;
  checkTransform:boolean = true;
  mapperdata;
  tdata: any = {};
  entityname;
  description;
  constructor(private _fb: FormBuilder, private router: Router,private toastr: ToastrService,
    private route: ActivatedRoute,private dataservice:BulkimportService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);

    // this.entryForm = this._fb.group({
    //   entity_name:[null],
    //   rule_line:[null],
    //   description: [null],
    //   active: [true], 
    // });
    

    this.dataservice.getDetailsById(this.id).subscribe(data => {
      this.tdata = data;
      this.serverData = JSON.parse(data.rule_line);
      console.log(this.tdata);
    },
    (err) => {
      console.log(err);
    });


    setTimeout(() => {
      

    this.route.queryParams.subscribe(params => {
      const data = params['data'];
      this.entityname = params['name']; 
      this.description = params['description'];


      if (data) {
        try {
          this.datajson = JSON.parse(data);
          console.log('Received data:', this.datajson);
        } catch (e) { console.error('Invalid JSON:', data);}
      }

  
  });

  if(this.tdata.rule_line !== '' && this.tdata.rule_line !== null && this.tdata.rule_line !== undefined) {
    console.log(this.tdata.rule_line)
    this.checkTransform = false;
    this.transform = true;
  }else{
    console.log(this.tdata.rule_line)
    this.checkTransform = true;
    this.transform = false;
    this.checkTransform = true;
  }

  const condition = this.dataservice.getCondition();
  if(condition === 'mapper'){
    console.log("datagetting");
    this.transform = true;
    this.checkTransform = false;
    if(this.datajson!== undefined){
      // if(this.entryForm.value.rule_line == 'undefined'){ this.entryForm.value.rule_line= '';}
      const currentText = this.tdata.rule_line = '';
      this.mapperdata = currentText + this.datajson;
      this.tdata.rule_line = this.mapperdata;
      // this.Updating();
      this.dataservice.setCondition('');
    }
  }
}, 1000);

  console.log(this.tdata);
  // this.entryForm.patchValue({
  //   entity_name: this.entityname,
  //   description: this.description,
  // });
  // console.log(this.entryForm.value);
  }

  getById(id: number) {

  }

  serverData = [];
  onAddLines(){
    this.serverData.push({
      rulename: "",
      fromsheet:"",
      fromColumn: "",
      validationTable: "",
      checkColumn: "",
      replacementcolumn:"",
      useColumn:"",
      errormsg:""
    });
    console.log(this.serverData);
  }
  deleteRow(index) {
    this.serverData.splice(index, 1);
  }

  toastrShown: boolean = false;
  onSubmit(){
    this.tdata.rule_line = JSON.stringify(this.serverData);
    console.log(this.tdata);
    this.dataservice.updateData(this.tdata, this.id).subscribe((data)=>{
      console.log(data);
      if (data.operationStatus) {
        this.toastr.warning(data.operationMessage);
      }else{
        if (!this.toastrShown) {
          this.toastrShown = true; // Set the flag to indicate that the toastr message has been shown
          this.toastr.success("Update Successfully");
          setTimeout(() => {
            this.router.navigate(["../../all"], { relativeTo: this.route });
          }, 500);
        }
      }
    }, (error: HttpHeaderResponse)=>{
      console.log(error);
      if(error.status===202){
        this.toastr.success("Update Succesfully");
      }
      if(error.status===404){
        this.toastr.error("Not Update");
      }
      if(error.status===400){
        this.toastr.error("Not Update");
      }
    });
    setTimeout(() => {
      this.router.navigate(["../../all"], { relativeTo: this.route });
    },500);
  }

  Updating(){
    console.log(this.tdata);
    this.dataservice.updateData(this.tdata, this.id).subscribe(data=>{
      console.log(data);
      // this.ngOnInit();
    }, (error: HttpHeaderResponse)=>{
      console.log(error);
    });
  }

  goback(){
    this.router.navigate(["../../all"], { relativeTo: this.route });
  }



  ///rules
  checkTrans(){
   
    console.log("rule line open")
    this.dataservice.setCondition('mapper');
  
    this.router.navigate(["../../rulelineedit/"], { relativeTo: this.route, queryParams: {id:this.id, data:this.tdata.rule_line, entityname:this.tdata.entity_name, description:this.tdata.description}, skipLocationChange: true});
    console.log(this.tdata.rule_line);
     
  }

  mappperclick = false;
  goFromMapper(){
    //this.mappperclick = true;
    this.dataservice.setCondition('mapper');
    this.router.navigate(["../../rulelineedit/"], { relativeTo: this.route, queryParams: {id:this.id, data:this.tdata.rule_line, entityname:this.tdata.entity_name, description:this.tdata.description}, skipLocationChange: true});
    console.log(this.tdata.rule_line);
  }

  transReset(){
    this.tdata.rule_line = undefined;
    this.transform = false;
    this.checkTransform = true;
  }

}
