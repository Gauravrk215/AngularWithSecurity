import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataflowService } from 'src/app/services/fnd/dataflow.service';
// import { NewwebhookService } from 'src/app/services/fnd/newwebhook.service';
// import { SftplocationService } from 'src/app/services/fnd/sftplocation.service';
// import { Webhookservicesui1Service } from 'src/app/services/fnd/webhookservicesui1.service';

@Component({
  selector: 'app-bulkimporteditline',
  templateUrl: './bulkimporteditline.component.html',
  styleUrls: ['./bulkimporteditline.component.scss']
})
export class BulkimporteditlineComponent implements OnInit {
  serverData = [];
  id;
  title
  sourceTable;
  sourceFData;
  Mid:any;
  flowType;
  remoteD;
  sftpDId;
  emailDId;
  key;
  webhookDId;

  name;
  description;
  // data = ['email', 'password']
  constructor( private router : Router,
    private route: ActivatedRoute,
    private dataservice:DataflowService,
    // private sftpService:SftplocationService,
    // private emaildbService:Webhookservicesui1Service,
    // private webhookService:NewwebhookService,
    private _fb:FormBuilder) { }

    public entryForm: FormGroup;

  ngOnInit(): void {
    // this.entryForm = this._fb.group({
    //    connector_json: this._fb.array([])
    // });

    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      // this.Mid = params['mid'];
      const data = params['data'];  
      this.name = params['entityname'];
      this.description = params['description'];
      if (data) {
        // try {
        //   this.serverData = data.replace(/\[|\]|"/g, '').split(','); //(/\[|\]|'/g, '') //(/[\[\]"]/g, '')
        //   console.log('Received data:', this.serverData );
        // } catch (e) { console.error('Invalid JSON:', data);}
        try {
          this.serverData = JSON.parse(data);
          console.log('Received data:', this.serverData );
        } catch (e) { console.error('Invalid JSON:', data);}
      }
      // this.serverData.map(d =>
      //   this.person.push(this._fb.group({ andor: '', fields_name:'',condition:'',value: d ,}))
      // );

    });

    const condition = this.dataservice.getCondition();
    if(condition === 'mapper'){
      console.log("mapper")
    }else if(condition === 'filter'){
      console.log("filter");
    }
    console.log(this.name,this.description);
 

    

  }

  columnList(){

      this.dataservice.getColumnListFromSourceTable(this.id,this.title).subscribe((data)=>{
        console.log(data);
        this.sourceTable = data;
      });
  }

  // sftpHeader(){
  //   this.sftpService.getExcelHeaders(this.title,this.remoteD).subscribe((headers) => {
  //     console.log("sftp Data",headers);
  //     this.sourceTable = headers;
  //   });
  // }

  // emailHeader(){
  //   this.emaildbService.getHeadersFromExcelMail(this.emailDId,this.title,this.key).subscribe((headers)=>{
  //     console.log("email Data",headers);
  //     this.sourceTable = headers;
  //   });
  // }

  // webhookHeader(){
  //   this.webhookService.getHeadersFromWBExcelMail(this.webhookDId,this.title,this.key).subscribe((headers)=>{
  //     console.log("webhook Data",headers);
  //     this.sourceTable = headers;
  //   });
  // }


  FilDemo(){
    let data = [""];
 const defaultObject = {
  andor: "AND",
  fields_name: "",
  condition: "=",
}
  const objectArray = data.map(value => ({
    ...defaultObject,
    value: value,
  }));
  console.log(objectArray);
  this.sourceFData = JSON.stringify(objectArray);

  try {
    this.serverData = JSON.parse(this.sourceFData);
    console.log('Received data:', this.serverData );
  } catch (e) { console.error('Invalid JSON:', this.sourceFData);}



  }
  // get person() {
  //   return this.entryForm.get("connector_json") as FormArray;
  // }

  onUpdate(){
    console.log(this.serverData);
    let serverData = JSON.stringify(this.serverData);
    console.log(serverData);
    let product = JSON.stringify(serverData);
    console.log(product);
    console.log(this.Mid);
     this.router.navigate(['../edit/'+ this.id],{relativeTo:this.route, queryParams: { data: product, name:this.name, description:this.description }, skipLocationChange: true});
  }
  back(){
    this.router.navigate(['../edit/'+ this.id], { relativeTo: this.route });
    this.dataservice.setCondition('');
  }

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
  }
  deleteRow(index) {
    this.serverData.splice(index, 1);
  }

  // postApi(){
  //  this.data.map(d =>
  //   this.person.push(this._fb.group({ fieldname: d , checkboxval:'',sample_format:'',mapped_fields:'',dest_format:''}))
  // ); 
  // }
}
