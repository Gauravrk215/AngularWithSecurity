import { HttpErrorResponse, HttpHeaderResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BulkimportService } from 'src/app/services/fnd/bulkimport.service';
@Component({
  selector: 'app-bulkimportadd',
  templateUrl: './bulkimportadd.component.html',
  styleUrls: ['./bulkimportadd.component.scss']
})
export class BulkimportaddComponent implements OnInit {
  public entryForm: FormGroup;
  selectedFile: File[]=[];

  datajson;
  transform:boolean = false;
  checkTransform:boolean = true;
  mapperdata;

  entityname;
  description;
  constructor(private _fb: FormBuilder, private router: Router,private toastr: ToastrService,
    private route: ActivatedRoute,private dataservice:BulkimportService) { }

  ngOnInit(): void {
    this.entryForm = this._fb.group({
      entity_name:[null],
      rule_line:[null],
      description: [null],
      active: [true], 
    });

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

  const condition = this.dataservice.getCondition();
  if(condition === 'mapper'){
    this.transform = true;
    this.checkTransform = false;
    if(this.datajson!== undefined){
      // if(this.entryForm.value.rule_line == 'undefined'){ this.entryForm.value.rule_line= '';}
      const currentText = this.entryForm.value.rule_line = '';
      this.mapperdata = currentText + this.datajson;
      // this.entryForm.value.rule_line = this.mapperdata;
      // this.Updating();
      this.dataservice.setCondition('');
    }
  }

  
  console.log(this.entryForm.value);

  this.entryForm.patchValue({
    entity_name: this.entityname,
    description: this.description,
  });
  
  console.log(this.entryForm.value);
  }

  serverData = [
    {
        "rulename": "",
        "fromsheet": "",
        "fromColumn": "",
        "validationTable": "",
        "checkColumn": "",
        "replacementcolumn": "",
        "useColumn": "",
        "errormsg": ""
    }];
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
    this.entryForm.value.rule_line = JSON.stringify(this.serverData);
    console.log(this.entryForm.value);
    this.dataservice.saveData(this.entryForm.value).subscribe((data)=>{
      console.log(data);
      if (data) {
        if (!this.toastrShown) {
          this.toastrShown = true; // Set the flag to indicate that the toastr message has been shown
          this.toastr.success("Added Successfully");
          setTimeout(() => {
            this.router.navigate(["../all"], { relativeTo: this.route });
          }, 500);
        }
      }
    }, (error: HttpHeaderResponse)=>{
      console.log(error);
      if(error.status===202){
        this.toastr.success("Added Succesfully");
      }
      if(error.status===404){
        this.toastr.error("Not Added");
      }
      if(error.status===400){
        this.toastr.error("Not Added");
      }
    });
    setTimeout(() => {
      this.router.navigate(["../all"], { relativeTo: this.route });
    },500);
  }
  goback(){
    this.router.navigate(["../all"], { relativeTo: this.route });
  }


  ///rules
  checkTrans(){
   
    console.log("rule line open")
    this.dataservice.setCondition('mapper');
  
    this.router.navigate(["../ruleline/"], { relativeTo: this.route, queryParams: {data:this.entryForm.value.rule_line, entityname:this.entryForm.value.entity_name, description:this.entryForm.value.description}, skipLocationChange: true});
    console.log(this.entryForm.value.entity_name);
     
  }

  mappperclick = false;
  goFromMapper(){
    //this.mappperclick = true;
    this.dataservice.setCondition('mapper');
    this.router.navigate(["../ruleline/"], { relativeTo: this.route, queryParams: {data:this.entryForm.value.rule_line, entityname:this.entryForm.value.entity_name, description:this.entryForm.value.description}, skipLocationChange: true});
    console.log(this.entryForm.value.entity_name);
  }

  transReset(){
    this.entryForm.value.rule_line = undefined;
    this.transform = false;
    this.checkTransform = true;
  }


  headerData;
  getColumns(table){
    console.log(table);
    // console.log(this.getbyiddata.entityName);
    this.dataservice.getColumnNames(table).subscribe((data) => {
      console.log(data);
      this.headerData = data;
  });
}

  checkTransformMapper = true;
  transformMapper = false;
  mapperText;
  getHeaderData;
  JsonHeader = [];
  selectedSheetName: string | null = null;
  columnJson =[];
  sheetNames:any;
  checkTransMapper(){
   
    console.log("Mapper open")
    // console.log(this.storeData);
    if(this.getHeaderData){
      this.checkTransformMapper = false;
      this.transformMapper = true;
      console.log(this.getHeaderData);
        if(this.mapperText === "undefined"){ this.mapperText= '';}
      const currentText = this.mapperText;
          let trnsfData = currentText + '' +this.getHeaderData;
          this.mapperText = trnsfData;
    }else {
      this.checkTransformMapper = true;
      this.transformMapper = false;
    }
     
  }
  mappperModal = false;
  goFromMapperField(){
    this.mappperModal = true;
    this.selectedSheetName = this.sheetNames[0];
    const tablename = this.columnJson[0].TableName;
    this.getColumns(tablename)
    if(this.mapperText){
      try {
        this.JsonHeader = JSON.parse(this.mapperText);
        console.log('Received data:', this.JsonHeader );
      } catch (e) { console.error('Invalid JSON:', this.mapperText);}
    }else
    if (this.getHeaderData) {
          // try {
          //   this.serverData = data.replace(/\[|\]|"/g, '').split(','); //(/\[|\]|'/g, '') //(/[\[\]"]/g, '')
          //   console.log('Received data:', this.serverData );
          // } catch (e) { console.error('Invalid JSON:', data);}
          try {
          this.JsonHeader = JSON.parse(this.getHeaderData);
          console.log('Received data:', this.JsonHeader );
        } catch (e) { console.error('Invalid JSON:', this.getHeaderData);}
       
        }
  }
  
  transResetMapper(){
    this.mapperText = '';
    this.transformMapper = false;
    this.checkTransformMapper = true;
  }

  onUpdate(){
    this.mappperModal = false;
  }

}
