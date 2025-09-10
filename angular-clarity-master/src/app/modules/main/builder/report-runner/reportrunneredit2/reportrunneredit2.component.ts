import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ReportBuilderService } from 'src/app/services/api/report-builder.service';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-reportrunneredit2',
  templateUrl: './reportrunneredit2.component.html',
  styleUrls: ['./reportrunneredit2.component.scss']
})
export class Reportrunneredit2Component implements OnInit {
  dynamicForm: FormGroup;
  modalselect:boolean=false;
  serverData = [{"andor": "AND",
  "fields_name": "",
  "condition": "=",
  "value": ""}];
  andor = ['AND', 'OR','NOT'];
  fieldname = ['name1', 'name2'];
  condition = ['=','!=','<','>','<=','>=','LIKE','BETWEEN','IN'];
  header_id;
  public array=[
    {
      "id": 1,
      "name": "Jack",
      "fromDate": "19-05-2023",
      "toDate": "03-06-2023"
    },
    {
      "id": 2,
      "name": "Allen",
      "fromDate": "18-05-2023",
      "toDate": "12-08-2023"
    },
    {
      "id": 3,
      "name": "Annie",
      "fromDate": "11-05-2023",//2023-11-05
      "toDate": "19-05-2023"
    },
    {
      "id": 4,
      "name": "ashok",
      "fromDate": "08-05-2023",
      "toDate": "02-02-2023"
    },
    {
      "id": 5,
      "name": "Anu",
      "fromDate": "29-11-2020",
      "toDate": "01-06-2021"
    },
    {
      "id": 6,
      "name": "thrymr",
      "fromDate": "04-04-2023",
      "toDate": "15-05-2023"
    },
    {
      "id": 7,
      "name": "Ab",
      "fromDate": "29-11-2022",
      "toDate": "01-06-2023"
    },
    {
      "id": 8,
      "name": "thakur",
      "fromDate": "04-04-2022",
      "toDate": "15-05-2022"
    }
  ]
  selectedfrom;
  selectedto;
  constructor(private router: Router,
    private route: ActivatedRoute,private _fb: FormBuilder,
    private reportBuilderService: ReportBuilderService,private toastr:ToastrService,private sanitizer: DomSanitizer,private excel: ExcelService) 
    {
      this.dynamicForm = this._fb.group({  
      });
     }
todayDate;
  ngOnInit(): void {
    this.todayDate = new Date().toISOString().slice(0, 10);
    this.header_id = this.route.snapshot.params["id"];
    console.log(" id = ", this.header_id);
    // this.duplicateArray=this.array;
    this.getById(this.header_id);

    this.select('Today')
    setTimeout(() => {
      this.runtheQuery();
    }, 2000);
  
    
  }
  reportName;
  builderLine;
  builderLineData;
  lineId;
  adhocList:any[];
  SQLQuery;
  getUrl;
  stdParamfields;
  DateParam;
  getById(id: number) {
    this.reportBuilderService.getrbDetailsById(id).subscribe(
      (data) => {
        console.log(data);
        this.reportName = data.reportName;
        this.builderLine = data.rpt_builder2_lines;
        this.lineId = this.builderLine[0].id
        this.builderLineData = JSON.parse(this.builderLine[0].model) ;
        console.log(this.lineId,this.builderLineData);
        this.builderLineData = this.builderLineData[0];
        this.adhocList = this.builderLineData.adhoc_param_html;
        // this.adhocList = JSON.parse(adhocList);
        this.DateParam = this.builderLineData.date_param_req;
        this.getUrl = this.builderLineData.url;
        console.log(this.adhocList,this.DateParam,this.getUrl)
        this.getStdParam(this.header_id);
        this.featchData();
      });

  }

  featchData(){
    this.reportBuilderService.getAllDetailsByurl(this.getUrl).subscribe(data =>{
      console.log(data);
      if(data.body){
        console.log(JSON.parse(data.body));
        this.rows = JSON.parse(data.body);
        this.filterRows = JSON.parse(data.body);
      }
    });
  }

  dynamicHtml:any = [];
  dynamicHtmlFlag = false;
  stdParmas;
  stdParamFlag = false;
  getStdParam(id: any){
    console.log(this.builderLineData.std_param_html);
    this.dynamicHtml = this.builderLineData.std_param_html;
    // this.dynamicHtml = ['a.abc','b.abcde']
    if (this.dynamicHtml) {
      for (const field of this.dynamicHtml) {
        if (!this.dynamicForm.get(field)) {
          this.dynamicForm.addControl(field, this._fb.control(null));
        }
      }
      console.log(this.dynamicForm.value);
    }
     if(this.dynamicHtml == undefined || this.dynamicHtml == ''){
       this.dynamicHtmlFlag = false;
     }else{
       this.dynamicHtmlFlag = true;
     }

    // this.reportBuilderService.getStdParamById(id).subscribe(data => {
    //   console.log(data);
    //   this.stdParmas = data;
    // },(error)=>{
    //   console.log(error.error.text)
    //   this.stdParmas = this.sanitizer.bypassSecurityTrustHtml(error.error.text);

    //   if(this.stdParmas == undefined || this.stdParmas == ''){
    //     this.stdParamFlag = false;
    //   }else{
    //     this.stdParamFlag = true;
    //   }
    // });
  }
  modo2(val){
    console.log(val);
    this.selectedfrom=val;
  }
  modo3(val){
    console.log(val);
this.selectedto=val;
  }
  duplicateArray=[];
  myDateValue: Date;
  toDate:Date;
  reverseAndTimeStamp(dateString) {
    const reverse = new Date(dateString.split("-").reverse().join("-"));
    return reverse.getTime();
    }
  filterDate() {
    let fromdate=moment(this.myDateValue).format('DD-MM-YYYY');
console.log(fromdate)
let todate=moment(this.toDate).format('DD-MM-YYYY');
if(this.myDateValue && this.toDate){
const selectedMembers = this.array.filter(m => {
        return this.reverseAndTimeStamp(m.fromDate) >= this.reverseAndTimeStamp(fromdate) && this.reverseAndTimeStamp(m.fromDate) <= this.reverseAndTimeStamp(todate)
    }
    );
    this.duplicateArray=selectedMembers
}else{
this.duplicateArray=this.array
}
    console.log(this.duplicateArray); // the result objects
    this.modalselect=false;
}

  dateParameter: string;
  from_date: Date;
  to_date: Date;

  calculateThisWeek(): void {
    // Calculate the current date
    const currentDate = new Date();
  console.log(currentDate)
    // Get the day of the week (0-6, where 0 is Sunday)
    const currentDayOfWeek = currentDate.getDay();

    // Calculate the number of days to subtract to get to Monday
    const daysToMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;

    // Calculate the date of Monday of the current week
    this.from_date = new Date(currentDate);
    this.from_date.setDate(currentDate.getDate() - daysToMonday);

    // Calculate the date of Sunday of the current week
    this.to_date = new Date(this.from_date);
    this.to_date.setDate(this.from_date.getDate() + 6);
    console.log(this.from_date);
    this.myDateValue=this.from_date;
    console.log(this.to_date);
    console.log(this.myDateValue);
    this.toDate=this.to_date;

    this.FromDatequery = this.from_date.toISOString().substring(0, 10);
    this.ToDatequery = this.to_date.toISOString().substring(0, 10);
    // this.filterDate();
  }
  calculateLastWeek(): void {
    // Calculate the current date
    const currentDate = new Date();

    // Get the day of the week (0-6, where 0 is Sunday)
    const currentDayOfWeek = currentDate.getDay();

    // Calculate the number of days to subtract to get to Monday
    const daysToMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;

    // Calculate the date of Monday of the previous week
    this.from_date = new Date(currentDate);
    this.from_date.setDate(currentDate.getDate() - daysToMonday - 7);

    // Calculate the date of Sunday of the previous week
    this.to_date = new Date(this.from_date);
    this.to_date.setDate(this.from_date.getDate() + 6);
    this.myDateValue=this.from_date;
    console.log(this.to_date);
    console.log(this.myDateValue);
    this.toDate=this.to_date;


    this.FromDatequery = this.from_date.toISOString().substring(0, 10);
    this.ToDatequery = this.to_date.toISOString().substring(0, 10);
    // this.filterDate();
  }
  calculateThisMonth(): void {
    // Calculate the current date
    const currentDate = new Date();
  
    // Calculate the date of the first day of the current month
    this.from_date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  
    // Calculate the date of the last day of the current month
    this.to_date = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  
    // Set the 'to_date' to the last day of the current month at the end of the day
    this.to_date.setHours(23, 59, 59, 999);
  
    // Optionally, you can set 'myDateValue' to 'from_date' if needed
    this.myDateValue = this.from_date;
  
    // Optionally, you can set 'toDate' to 'to_date' if needed
    this.toDate = this.to_date;
  
    console.log(this.from_date);
    console.log(this.to_date);


    this.FromDatequery = this.from_date.toISOString().substring(0, 10);
    this.ToDatequery = this.to_date.toISOString().substring(0, 10);
  }
  

  calculateLastMonth(): void {
    // Calculate the current date
    const currentDate = new Date();
  
    // Calculate the date of the first day of the previous month
    this.from_date = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
  
    // Calculate the date of the last day of the previous month
    this.to_date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
  
    // Set the 'to_date' to the last day of the previous month at the end of the day
    this.to_date.setHours(23, 59, 59, 999);
  
    // Optionally, you can set 'myDateValue' to 'from_date' if needed
    this.myDateValue = this.from_date;
  
    // Optionally, you can set 'toDate' to 'to_date' if needed
    this.toDate = this.to_date;
  
    console.log(this.from_date);
    console.log(this.to_date);

    this.FromDatequery = this.from_date.toISOString().substring(0, 10);
    this.ToDatequery = this.to_date.toISOString().substring(0, 10);
  }
  
  calculateThisYear(): void {
    // Calculate the current date
    const currentDate = new Date();

    // Calculate the date of the first day of the current year
    this.from_date = new Date(currentDate.getFullYear(), 0, 1);

    // Calculate the date of the last day of the current year
    this.to_date = new Date(currentDate.getFullYear(), 11, 31);

    this.myDateValue=this.from_date;
    console.log(this.to_date);
    console.log(this.myDateValue);
    this.toDate=this.to_date;


    this.FromDatequery = this.from_date.toISOString().substring(0, 10);
    this.ToDatequery = this.to_date.toISOString().substring(0, 10);
    // this.filterDate();
  }

  calculateLastYear(): void {
    // Calculate the current date
    const currentDate = new Date();

    // Calculate the date of the first day of the previous year
    this.from_date = new Date(currentDate.getFullYear() - 1, 0, 1);

    // Calculate the date of the last day of the previous year
    this.to_date = new Date(currentDate.getFullYear() - 1, 11, 31);

    this.myDateValue=this.from_date;
    console.log(this.to_date);
    console.log(this.myDateValue);
    this.toDate=this.to_date;

    this.FromDatequery = this.from_date.toISOString().substring(0, 10);
    this.ToDatequery = this.to_date.toISOString().substring(0, 10);
    // this.filterDate();
  }
  SelectdateType;
  select(val:any){
  console.log(val);
  this.SelectdateType = val;
      if(val === 'This Week'){
      this.FromDatequery = null;
      this.ToDatequery = null;
      this.calculateThisWeek()
      }else if(val === 'Last Week'){
        this.FromDatequery = null;
        this.ToDatequery = null;
       this.calculateLastWeek()
      }else if(val === 'This Month'){
        this.FromDatequery = null;
        this.ToDatequery = null;
          this.calculateThisMonth()
       }else if(val === 'Last Month'){
        this.FromDatequery = null;
        this.ToDatequery = null;
            this.calculateLastMonth()
      //  }else if(val === 'To Specific FromDate To To Date'){
      //         this.openmodel()
       }
       else if(val === 'This Year'){
        this.FromDatequery = null;
        this.ToDatequery = null;
        this.calculateThisYear()
       }else if(val === 'Last Year'){
        this.FromDatequery = null;
        this.ToDatequery = null;
        this.calculateLastYear()
      }
      else if(val === 'Today'){
        this.FromDatequery = null;
        this.ToDatequery = null;
        this.myDateValue = this.todayDate;
        this.toDate = this.todayDate;

        this.FromDatequery = this.myDateValue;
        this.ToDatequery = this.toDate;
      }
      else if(val === '--Select Particular--'){
        this.FromDatequery = null;
        this.ToDatequery = null;
        this.newfrom = null;
        this.newto = null;
        this.myDateValue = null;
        this.toDate = null;
      }


  }
  openmodel(){
    this.modalselect=true;
            }

 onExport() {
  const reportNameWithUnderscore = this.reportName + '_';
   this.excel.exportAsExcelFile(this.rows, reportNameWithUnderscore,
  moment().format('YYYYMMDD_HHmmss'))
  } 

  downloadFile(format: string) {
    const date = moment().format('YYYYMMDD_HHmmss')
    const reportNameWithUnderscore = this.reportName + '_' + date;
    this.reportBuilderService.downloadFile(format, this.filterRows,reportNameWithUnderscore)
  }
  back(){
    this.router.navigate(["../../all"], { relativeTo: this.route });
  }
FormattedAdhocparameters;
adocdata;
// showPlusIconRow: number | null = 0;
    onAddLines(){
      console.log(this.serverData);
      const lastRow = this.serverData[this.serverData.length - 1];
      if (lastRow && lastRow.fields_name !== '') {
      let formattedString = '';
      for (const condition of this.serverData) {
        const { andor, fields_name, condition: cond, value } = condition;
        formattedString += ` ${andor} ${fields_name} ${cond} '${value}' `;
        console.log(formattedString);
        this.FormattedAdhocparameters = formattedString
        // this.selectcolumn(this.serverData);
      }
    this.serverData.push({
      andor: "AND",
      fields_name: "",
      condition: "=",
      value: ""
    });
  }
    // this.showPlusIconRow = this.serverData.length - 1;

  }
  deleteRow(index) {
    // this.serverData.splice(index, 1);
    // if (index === this.showPlusIconRow) {
    //   this.showPlusIconRow = null;
    // } 
    if (this.serverData.length > 1) {
      // Get the item to be deleted
      const deletedItem = this.serverData[index];
  
      // Remove the item from the serverData array
      this.serverData.splice(index, 1);
  
      // Remove the corresponding entries from selectedValues
      if (Array.isArray(deletedItem)) {
        for (const item of deletedItem) {
          const columnName = item.fields_name;
          if (this.selectedValues[columnName]) {
            const value = item.value;
            const indexInArray = this.selectedValues[columnName].indexOf(value);
            if (indexInArray !== -1) {
              this.selectedValues[columnName].splice(indexInArray, 1);
            }
          }
        }
      } else if (typeof deletedItem === 'object') {
        const columnName = deletedItem.fields_name;
        if (this.selectedValues[columnName]) {
          const value = deletedItem.value;
          const indexInArray = this.selectedValues[columnName].indexOf(value);
          if (indexInArray !== -1) {
            this.selectedValues[columnName].splice(indexInArray, 1);
          }
        }
      }
    }
  
    console.log(this.selectedValues);
    this.filterRowsBySelectedValues();  
  }       


  rows:any[];
  filterRows:any[];
  columns: any[];
  rowdata;
  FromDatequery;
  ToDatequery;

  newfrom;
  newto;

  dateKey;
runtheQuery(){
  console.log(this.myDateValue , this.toDate);
 let query = this.SQLQuery;
// let query
 if(this.dynamicForm.value){
  // for(let i = 0; i < this.dynamicForm.value.length; i++){
  //   // const query = this.SQLQuery + " AND " + this.dynamicForm.controls[i] + " = " + this.dynamicForm.value[i]
    
  // }


  // Iterate over the keys in dynamicForm.value
  Object.keys(this.dynamicForm.value).forEach((key) => {
    // Append the condition for each key to the query
    if (this.dynamicForm.value[key] !== null ) {
      this.selectcolumn(this.dynamicForm.value);
    // query += ` AND ${key} = '${this.dynamicForm.value[key]}'`;
    }
    // const regex = /FROM/i;
    // const match = query.match(regex);
    //    if (this.dynamicForm.value[key] !== null && this.dynamicForm.value[key] !== '') {
    // // query += ` AND ${key} = '${this.dynamicForm.value[key]}'`;
    // const columnName = key.split('.').pop();
    // let coalesceExpression = `, COALESCE(${key}, '${this.dynamicForm.value[key]}') as  ${columnName}`;
    // if (match) {
    //   // Insert the COALESCE expression before the FROM keyword
    //   query = query.slice(0, match.index) + coalesceExpression +' '+ query.slice(match.index);
    // }
    // }
  });
  // if(this.FromDatequery && this.ToDatequery){
  //   query += ` AND cretaedat BETWEEN '${this.FromDatequery}' AND '${this.ToDatequery}'`;

  // }else
  if(this.DateParam == true){
    this.dateKey = 'createdat';
    this.adhocList.forEach(key => {
      if (key.includes("created_at")) {
        this.dateKey ="created_at" ;
      }
  });
  this.adhocList.forEach(key => {
    if (key.includes("createdAt")) {
      this.dateKey ="createdAt" ;
    }
});
   if(this.myDateValue && this.toDate){
    if(this.myDateValue){
      this.newfrom = new Date(this.myDateValue);
    // const year = inputDate.getFullYear();
    // const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
    // const day = String(inputDate.getDate()).padStart(2, "0");
    // this.newfrom = `${year}-${month}-${day}`;
    }
    if(this.toDate){
      this.newto = new Date(this.toDate);
      // const year = inputDate.getFullYear();
      // const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
      // const day = String(inputDate.getDate()).padStart(2, "0");
      // this.newto = `${year}-${month}-${day}`;
      
    }
  query += ` AND ${this.dateKey} BETWEEN '${this.newfrom}' AND '${this.newto}'`;

}
  }
  // if(this.myDateValue && this.toDate){
  //   query += ` AND from_date = NVL(${this.myDateValue}from_date, 'from_date') AND to_date = NVL(${this.toDate}to_date, 'to_date')`;
  // }
  console.log(query);
 }
//  if(this.FormattedAdhocparameters){
//   query += this.FormattedAdhocparameters
//  }

      this.selectcolumn(this.serverData);
//  query = `SELECT a.name AS name, b.dob AS dob FROM abc a, abcde b WHERE a.name = 'gaurav' AND a.abc = NVL(b.abc, 'name') AND a.abcde = NVL(b.abcde, 'test');`
 console.log(query);
  this.reportBuilderService.getMasterData(query).subscribe((data) => {
    // this.rows = data;
   
    console.log(this.rows);
this.rowdata= [this.rows];
    console.log(typeof this.rows);
    if(data){
      this.toastr.success("Run Successfully")
    }
     var j;
     var cart = [];

   for(var i = 0; i < data.length; i++)
   {
     var columnsIn = data[i];
     if(i==1)
     {
         for(var key in columnsIn)
        {
         j={prop:key , name: key};
         cart.push(j)

        }
     }
   }
   this.columns = cart;

});
}
getHeaders() {
let headers: string[] = [];
if(this.rows) {
  this.rows.forEach((value) => {
    Object.keys(value).forEach((key) => {
      if(!headers.find((header) => header == key)){
        headers.push(key)
      }

    })

  })
}
return headers;
}

getFilterHeaders() {
  let headers: string[] = [];
  if(this.filterRows) {
    this.filterRows.forEach((value) => {
      Object.keys(value).forEach((key) => {
        if(!headers.find((header) => header == key)){
          headers.push(key)
        }
      })
    })
  }
  return headers;
  }



selectedValues: { [key: string]: any[] } = {};
selectcolumn(data: any) {
  if (Array.isArray(data)) {
    for (const item of data) {
      const columnName = item.fields_name;
      const value = item.value;

      // Check if fields_name is not empty and value is not null or empty string
      if (columnName.trim() !== '') {
        if (!this.selectedValues[columnName]) {
          this.selectedValues[columnName] = [];
        }

        if (value !== null && value.trim() !== '') {
          // Only add the value if it's not null and not an empty string
          if (!this.selectedValues[columnName].includes(value)) {
            this.selectedValues[columnName].push(value);
          }
        } else {
          // Remove the property if the value is null or empty string
          delete this.selectedValues[columnName];
        }
      }
    }
  } else if (typeof data === 'object') {
    // Handle the first JSON structure (object)
    console.log(data);
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const columnName = key;
        const value = data[key];

        if (!this.selectedValues[columnName]) {
          this.selectedValues[columnName] = [];
        }

        if (value !== null && value.trim() !== '') {
          // Only add the value if it's not null and not an empty string
          if (!this.selectedValues[columnName].includes(value)) {
            this.selectedValues[columnName].push(value);
          }
        } else {
          // Remove the property if the value is null or empty string
          delete this.selectedValues[columnName];
        }
      }
    }
  }

  console.log(this.selectedValues);
  this.filterRowsBySelectedValues();
}




filtered = false;
filterRowsBySelectedValues() {
  // Create a filteredRows array to store the filtered data
  const filteredRows = [];

  // Iterate through each row in the rows array
  for (const row of this.rows) {
    let isMatch = true;

    // Iterate through each column in the selectedValues object
    for (const columnName in this.selectedValues) {
      if (this.selectedValues.hasOwnProperty(columnName) && row.hasOwnProperty(columnName)) {
        // Get the selected values for the current column
        const selectedValuesForColumn = this.selectedValues[columnName];

        // Get the type of the row's value for the current column
        const rowValue = row[columnName];
        const rowValueType = typeof rowValue;

        if (rowValueType === 'boolean') {
          // Handle boolean values
          if (selectedValuesForColumn.length === 0) {
            // If no specific value selected for boolean, include the row
            continue;
          }

          const selectedBooleanValue = selectedValuesForColumn[0] === 'true'; // Convert to boolean
          if (selectedBooleanValue !== rowValue) {
            isMatch = false;
            break; // No need to check other columns if it's not a match
          }
        } else {
          // Handle other data types, including numbers and strings
          // Convert selected values to the appropriate type
          const convertedValues = selectedValuesForColumn.map((value) => {
            if (rowValueType === 'number') {
              return parseFloat(value); // Convert to number
            } else {
              return value; // Keep the original value (string, etc.)
            }
          });

          // Check if the row's value for the current column matches any selected value
          if (!convertedValues.includes(rowValue)) {
            isMatch = false;
            break; // No need to check other columns if it's not a match
          }
        }
      }
    }
      if(this.FromDatequery !== null && this.ToDatequery !== null){
        this.newfrom = this.FromDatequery
        this.newto = this.ToDatequery
  }

    if (this.newfrom !== null && this.newto !== null) {
      // Extract the year, month, and day from newfrom and newto
      const from = new Date(this.newfrom);
      const to = new Date(this.newto);
      const newfromYear = from.getFullYear();
      const newfromMonth = from.getMonth();
      const newfromDay = from.getDate();
      const newtoYear = to.getFullYear();
      const newtoMonth = to.getMonth();
      const newtoDay = to.getDate();
    
      // Extract the year, month, and day from createdAtDate
      const dateKey = this.dateKey;
      const createdAtDate = new Date(row[dateKey]);
      const createdAtYear = createdAtDate.getFullYear();
      const createdAtMonth = createdAtDate.getMonth();
      const createdAtDay = createdAtDate.getDate();
    
      // Create new Date objects using the extracted year, month, and day
      const newfromDate = new Date(newfromYear, newfromMonth, newfromDay);
      const newtoDate = new Date(newtoYear, newtoMonth, newtoDay);
      const createdAtDateOnly = new Date(createdAtYear, createdAtMonth, createdAtDay);
    
      // Check if the createdAtDateOnly is within the specified date range
      if (createdAtDateOnly < newfromDate || createdAtDateOnly > newtoDate) {
        isMatch = false;
      }
    }
    

    // If the row matches all selected values, add it to the filteredRows array
    if (isMatch) {
      filteredRows.push(row);
    }
  }

  // Assign the filtered data to the rows
  console.log(filteredRows);
  this.filterRows = filteredRows;

  // Check if all arrays in selectedValues are empty
  const allArraysEmpty = Object.values(this.selectedValues).every(arr => arr.length === 0);

  // Check if the date range is not selected
  const dateRangeNotSelected = !this.newfrom || !this.newto;

  // Set this.filtered based on allArraysEmpty and dateRangeNotSelected
  this.filtered = !allArraysEmpty || !dateRangeNotSelected;
}



formatDate(dateObj: any): string {
  // Extract individual date properties
  const { year, monthValue, dayOfMonth, hour, minute, second } = dateObj;

  // Create a JavaScript Date object using the extracted properties
  const formattedDate = new Date(year, monthValue - 1, dayOfMonth, hour, minute, second);

  // Format the date as needed (e.g., using built-in JavaScript date formatting)
  return formattedDate.toLocaleString(); // Or any other desired formatting
}

isDate(value: any): boolean {
  return (
    value instanceof Date ||
    (value &&
      value.year !== undefined &&
      value.monthValue !== undefined &&
      value.dayOfMonth !== undefined)
  );
}

}
