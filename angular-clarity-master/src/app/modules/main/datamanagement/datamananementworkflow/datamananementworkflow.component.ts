import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatamanagementService } from 'src/app/services/fnd/datamanagement.service';
import { ExcelService } from 'src/app/services/excel.service';
import { BulkimportService } from 'src/app/services/fnd/bulkimport.service';

@Component({
  selector: 'app-datamananementworkflow',
  templateUrl: './datamananementworkflow.component.html',
  styleUrls: ['./datamananementworkflow.component.scss']
})
export class DatamananementworkflowComponent implements OnInit {
  data;
  getbyiddata;
  id;
  columns: any[];
  rows: any[];
  bodyrow: any[] = [];
  getHeaderData;
  JsonHeader = [];
  rowdata;
  transform: boolean = false;
  checkTransform: boolean = true;
  mapperText: string = '';
  changeKeyJson: any[];
  tableName;



  // Layout direction changing

  layout = {
    direction: "horizontal",
    block1: "clr-col-lg-12 clr-col-12 height container",
    block2: "clr-col-lg-12 clr-col-12 container",
  }
  timelineStyle = {
    step0: { state: "current", open: true, failed: false },
    step1: { state: "not-started", open: false, failed: false },
    step2: { state: "not-started", open: false, failed: false },
    step3: { state: "not-started", open: false, failed: false },
    step4: { state: "not-started", open: false, failed: false },
    step5: { state: "not-started", open: false, failed: false },
  };

  json: string = "";
  luisApp =
    {
      name: '',
      created: 1,
      trained: 1,
      tested: 1,
      updated: 1,
      published: 1,

    };
  constructor(private excel: ExcelService, private datamservice: DatamanagementService, private toastr: ToastrService, private router: Router,
    private route: ActivatedRoute, public bulkUpload: BulkimportService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);
    this.getall();
    this.getSheetName(this.id);
    this.getById(this.id);

    this.getTableData(this.id);
    // this.getColumns(this.tableName);
    // this.getHeadersById(this.id);

  }

  getall() {
    this.datamservice.getall().subscribe((data) => {
      console.log(data);
      this.data = data;
    })
  }


  getById(id) {
    this.datamservice.getTemplateById(id).subscribe((data) => {
      console.log(data);
      this.getbyiddata = data;
      this.tableName = data.entityName;
    });
  }
  headerData;
  getColumns(table) {
    console.log(table);
    // console.log(this.getbyiddata.entityName);
    this.bulkUpload.getColumnNames(table).subscribe((data) => {
      console.log(data);
      this.headerData = data;
    });
  }
  getHeadersById(id) {
    console.log(this.columnJson);
    this.bulkUpload.getHeader(id).subscribe((data) => {
      console.log(data);
      this.getHeaderData = JSON.stringify(data);

      // const objectArray = data.map(key => ({
      //   headerName: key,
      //   value: "",
      // }));
      // // console.log(objectArray);
      // this.getHeaderData = JSON.stringify(objectArray);
      // console.log(this.getHeaderData);

      // const json = `{"Customer":[{"headerName":"balance","value":""},{"headerName":"c_status","value":""},{"headerName":"city","value":""},{"headerName":"country","value":""},{"headerName":"currency_code","value":""},{"headerName":"customer_id","value":""},{"headerName":"date_of_birth","value":""},{"headerName":"defaultsite_id","value":""}],
      // "Site":[{"headerName":"balance","value":""},{"headerName":"city","value":""},{"headerName":"country","value":""},{"headerName":"credit_profile","value":""},{"headerName":"currency_code","value":""},{"headerName":"date_of_birth","value":""},{"headerName":"default_order_type","value":""},{"headerName":"dsa","value":""}]}`
      // this.getHeaderData = json;

    }, (error) => {
      console.log(error);
    });

  }

  selectedSheetName: string | null = null;
  getHeaderbybutton(id, sheetName) {
    // this.bulkUpload.getHeader(id,sheetName).subscribe((data) => {
    //   console.log(data);
    //   this.getHeaderData = data;

    //     const objectArray = data.map(key => ({
    //       headerName: key,
    //       value: "",
    //     }));
    //     // console.log(objectArray);
    //     this.getHeaderData = JSON.stringify(objectArray);
    //     console.log(this.getHeaderData);



    //   },(error) => {
    //     console.log(error);
    //   });
    this.selectedSheetName = sheetName;
    const columnEntry = this.columnJson.find(entry => entry.sheetName === sheetName);
    if (columnEntry) {
      const tablename = columnEntry.TableName;
      this.getColumns(tablename);
    }
  }


  checkData() {
    console.log(this.JsonHeader);
    console.log(this.mapperText);
  }

  getkeychangesJson() {

    const jsonString = JSON.stringify(this.rows);
    console.log("body", jsonString);
    // const datajson = JSON.parse(this.datajson);
    // this.datajson = [datajson];
    // console.log(this.datajson);

    this.bulkUpload.changeKeysOfJson(this.datajson, jsonString).subscribe((data) => {
      console.log(data);
      this.changeKeyJson = data.body;
    }, (error: HttpErrorResponse) => {
      console.log(error.error);
    });
  }
  // getHeaderskeychange() {
  //   let headers: string[] = [];
  //   if(this.changeKeyJson) {
  //     this.changeKeyJson.forEach((value) => {
  //       Object.keys(value).forEach((key) => {
  //         if(!headers.find((header) => header == key)){
  //           headers.push(key)
  //         }

  //       })

  //     })
  //   }
  //   return headers;
  //   }
  getHeaderskeychange(sheetName: string) {
    if (this.changeKeyJson && this.changeKeyJson.length > 0 && this.changeKeyJson[0][sheetName]) {
      // Assuming the first item in the array contains the keys.
      return Object.keys(this.changeKeyJson[0][sheetName][0]);
    }
    return [];
  }

  getkeychangeData(sheetName: string) {
    if (this.changeKeyJson && this.changeKeyJson.length > 0 && this.changeKeyJson[0][sheetName]) {
      // Returning the array of data.
      return this.changeKeyJson[0][sheetName];
    }
    return [];
  }
  // Change to Horizontal Layout
  changeToHorizonTal() {
    this.layout = {
      direction: "horizontal",
      block1: "clr-col-lg-12 clr-col-12 height container",
      block2: "clr-col-lg-12 clr-col-12 container",
    }
  }
  // Change to Vertical Layout
  changeToVertical() {
    this.layout = {
      direction: "vertical",
      block1: "clr-col-lg-3 clr-col-12 ",
      block2: "clr-col-lg-9 clr-col-12 ",
    }
  }
  reset() {
    this.json = "";
    this.luisApp =
    {
      name: '',
      trained: 1,
      tested: 1,
      updated: 1,
      published: 1,


      created: 1,

    };

    this.timelineStyle = {
      step0: { state: "current", open: true, failed: false },
      step1: { state: "not-started", open: false, failed: false },
      step2: { state: "not-started", open: false, failed: false },
      step3: { state: "not-started", open: false, failed: false },
      step4: { state: "not-started", open: false, failed: false },
      step5: { state: "not-started", open: false, failed: false },
    };
  }


  //dynamic table
  sheetNames: any;
  getSheetName(id) {
    this.bulkUpload.getSheetName(id).subscribe(data => {
      console.log(data);
      this.sheetNames = data;
    });
  }

  getTableData(id) {
    // console.log(this.getbyiddata.file_name);
    this.bulkUpload.convertFileToJson(id).subscribe((data) => {
      this.rows = data;
      // this.bodyrow = data;
      console.log(this.rows);
      this.rowdata = [this.rows];
      this.rows = [this.rows]
      console.log(typeof this.rows);
      if (data) {
        // this.toastr.success("Run Successfully")
      }
      var j;
      var cart = [];

      for (var i = 0; i < data.length; i++) {
        var columnsIn = data[i];
        if (i == 1) {
          for (var key in columnsIn) {
            j = { prop: key, name: key };
            cart.push(j)

          }
        }
      }
      this.columns = cart;

    });
  }
  // sheetNames = ['Customer', 'Site'];
  getHeaders(sheetName: string) {
    if (this.rows && this.rows.length > 0 && this.rows[0][sheetName]) {
      // Assuming the first item in the array contains the keys.
      return Object.keys(this.rows[0][sheetName][0]);
    }
    return [];
  }

  getData(sheetName: string) {
    if (this.rows && this.rows.length > 0 && this.rows[0][sheetName]) {
      // Returning the array of data.
      return this.rows[0][sheetName];
    }
    return [];
  }

  // getHeaders() {
  // let headers: string[] = [];
  // this.rows= []
  // if(this.rows) {
  //   this.rows.forEach((value) => {
  //     Object.keys(value).forEach((key) => {
  //       if(!headers.find((header) => header == key)){
  //         headers.push(key)
  //       }

  //     })

  //   })
  // }
  // return headers;
  // }

  //data mapping
  checkTrans() {

    console.log("transform open")
    // console.log(this.storeData);
    if (this.getHeaderData) {
      this.checkTransform = false;
      this.transform = true;
      console.log(this.getHeaderData);
      if (this.mapperText === "undefined") { this.mapperText = ''; }
      const currentText = this.mapperText;
      let trnsfData = currentText + '' + this.getHeaderData;
      this.mapperText = trnsfData;
    } else {
      this.checkTransform = true;
      this.transform = false;
    }

  }
  mappperModal = false;
  goFromMapper() {
    this.mappperModal = true;
    this.selectedSheetName = this.sheetNames[0];
    const tablename = this.columnJson[0].TableName;
    this.getColumns(tablename)
    if (this.mapperText) {
      try {
        this.JsonHeader = JSON.parse(this.mapperText);
        console.log('Received data:', this.JsonHeader);
      } catch (e) { console.error('Invalid JSON:', this.mapperText); }
    } else
      if (this.getHeaderData) {
        // try {
        //   this.serverData = data.replace(/\[|\]|"/g, '').split(','); //(/\[|\]|'/g, '') //(/[\[\]"]/g, '')
        //   console.log('Received data:', this.serverData );
        // } catch (e) { console.error('Invalid JSON:', data);}
        try {
          this.JsonHeader = JSON.parse(this.getHeaderData);
          console.log('Received data:', this.JsonHeader);
        } catch (e) { console.error('Invalid JSON:', this.getHeaderData); }

      }
    //this.mappperclick = true;
    // this.router.navigate(["../../mapperTable/"], { relativeTo: this.route, queryParams: { id: this.updateId, data: this.nodeEditProperties.mappers, title:this.nodeEditProperties.title }, skipLocationChange: true});
    // console.log("gofrommapper",this.updateId,this.nodeEditProperties.mappers)
    // if(this.mappperclick = true && this.datajson!= null){
    //   this.nodeEditProperties.mappers = this.datajson;
    // }
  }

  transReset() {
    this.mapperText = '';
    this.transform = false;
    this.checkTransform = true;
  }

  Rule: boolean = false;
  checkRule: boolean = true;
  RuleData: string = '';
  ruleModal = false;
  RuleHeader = [];

  checkRules() {
    console.log("rule line open")
    this.ruleModal = true;


  }

  rulechecking() {
    if (this.RuleData) {
      console.log(this.RuleData);
      this.checkRule = false;
      this.Rule = true;
    } else {
      this.Rule = false;
      this.checkRule = true;
    }
  }

  mappperclick = false;
  goFromRule() {
    this.ruleModal = true;
    if (this.RuleData) {
      try {
        this.RuleHeader = JSON.parse(this.RuleData);
        console.log('Received data:', this.RuleHeader);
      } catch (e) { console.error('Invalid JSON:', this.RuleData); }
    }
    console.log(this.RuleHeader);
  }

  resetRule() {
    this.RuleData = undefined;
    this.RuleHeader = [];
    this.Rule = false;
    this.checkRule = true;
  }

  onAddLines() {
    this.RuleHeader.push({
      rulename: "",
      fromsheet: "",
      fromColumn: "",
      validationTable: "",
      checkColumn: "",
      useColumn: "",
      replacementTable: "",
      replacementcolumn: "",
      errormsg: ""
    });
  }
  deleteRow(index) {
    this.RuleHeader.splice(index, 1);
  }

  onRuleUpdate() {
    this.ruleModal = false;
    console.log("rule", this.RuleHeader);
    let serverData = JSON.stringify(this.RuleHeader);
    // console.log(serverData);
    let product = JSON.stringify(serverData);
    // console.log(product);

    try {
      this.RuleData = JSON.parse(product);
      console.log('Received rulejson data:', this.RuleData);
    } catch (e) { console.error('Invalid JSON:', product); }
    this.rulechecking()
  }


  datajson;
  keychangeTable = false;
  onUpdate() {
    this.mappperModal = false;
    console.log(this.JsonHeader);
    let serverData = JSON.stringify(this.JsonHeader);
    // console.log(serverData);
    let product = JSON.stringify(serverData);
    // console.log(product);

    try {
      this.datajson = JSON.parse(product);
      console.log('Received Newjson data:', this.datajson);
    } catch (e) { console.error('Invalid JSON:', product); }

    this.mapperText = this.datajson;

    // const output = this.datajson.reduce((result, item) => {
    //   result[item.headerName] = item.value;
    //   return result;
    // }, {});

    // console.log(output);

    this.getkeychangesJson();
    this.keychangeTable = true;
  }

  //download excel file

  selectedTable;
  selectTable(val) {
    this.selectedTable = val;
    // this.downloadExcel(val);
  }

  downloadExcel(id) {
    console.log(this.changeKeyJson);
    const jsonDataWithoutBrackets = this.changeKeyJson[0];
    console.log(jsonDataWithoutBrackets);
    console.log(this.RuleHeader);
    this.bulkUpload.downloadExcel(id, jsonDataWithoutBrackets, this.RuleHeader).subscribe(
      (response: Blob) => {
        // Process the downloaded Excel file
        console.log(response);
        // const file = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        // const fileUrl = URL.createObjectURL(file);
        // const link = document.createElement('a');
        // link.href = fileUrl;
        // link.download = 'data.xlsx'; // Set the desired file name
        // link.click();

        // this.timelineStyle = {
        //   step0: { state: "success", open: false, failed: false },
        //   step1: { state: "success", open: false, failed: false },
        //   step2: { state: "success", open: false, failed: false },
        //   step3: { state: "success", open: false, failed: false },
        //   step4: { state: "current", open: true, failed: false },
        // };
      },
      (error) => {
        // Handle error
        console.log(error);
        // this.timelineStyle = {
        //   step0: { state: "success", open: false, failed: false },
        //   step1: { state: "success", open: false, failed: false },
        //   step2: { state: "success", open: false, failed: false },
        //   step3: { state: "current", open: true, failed: false },
        //   step4: { state: "not-started", open: false, failed: false },
        //   step5: { state: "not-started", open: false, failed: false },
        // };

      }
    );
  }

  getSheet(id) {
    this.bulkUpload.getSheet(id).subscribe(
      (response: Blob) => {
        // Process the downloaded Excel file
        console.log(response);
        const file = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const fileUrl = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = 'data.xlsx'; // Set the desired file name
        link.click();

      });
  }

  back() {
    this.router.navigate(["../../datamanagement"], { relativeTo: this.route });
  }

  ////step 1 - mapping name
  columnJson = []
  getColumnforstep1() {

    const objectArray = this.sheetNames.map(key => ({
      sheetName: key,
      TableName: "",
    }));
    // console.log(objectArray);
    this.columnJson = objectArray;

  }

}
