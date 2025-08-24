import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ReportBuilderService } from 'src/app/services/api/report-builder.service';
import { TableList } from '../../../../../models/fnd/table-setup';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reportbuildquery',
  templateUrl: './reportbuildquery.component.html',
  styleUrls: ['./reportbuildquery.component.scss']
})
export class ReportbuildqueryComponent implements OnInit {
  searchtable: any;
  searchcol: any;
  columns: any[];
  table: boolean = false;
  database: boolean = false;
  query: boolean = false;
  public entryForm: FormGroup;
  public addForm: FormGroup;
  public saveReportForm: FormGroup;
  addmodal: boolean = false;
  query2: string;
  rows: any[];
  loading = false;
  tableList: TableList[];
  databaselist = [];
  collist;
  search: any;
  selectedtable: any[];
  selectedcol: any[];
  selectedcol1: any[];
  selectedParamter: any[];
  selectedtablequery;
  selectcolquery;
  selectedquery;
  backQuery = true;
  searchquery;
  col: boolean = false;
  col1: boolean = false;
  searchdatabase;
  selecteddatabase;
  msg;
  id;
  querydata;
  errorco;
  errortb;
  errorcl;
  loadingIndicator = true; reorderable = true;
  columnModal = false;
  reportModal = false;
  filterModel = false;
  conditionData = [];
  stdParamters = [];
  columnData = [];
  andor = ['AND', 'OR', 'NOT'];
  fieldname = ['name1', 'name2'];
  condition = ['=', '!=', '<', '>', '<=', '>=', 'LIKE', 'BETWEEN', 'IN'];
  alias = ['a', 'b', 'c', 'd', 'e', 'f'];
  tabs = ['Tab', 'Tab',];
  selected = new FormControl(0);
  constructor(private _fb: FormBuilder, private router: Router,
    private route: ActivatedRoute,
    private reportBuilderService: ReportBuilderService, private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);
    this.entryForm = this._fb.group({
      sql_query: [null],
    });
    this.addForm = this._fb.group({
      conn_string: [null],
      username: [null],
      password: [null],
      driver_class_name: [null],
    })

    this.saveReportForm = this._fb.group({
      conn_name: [null],
      // reportName: [null],
      folderName: [null],
      // description:[null],
      // active:[null],
      sql_str: [null],
      date_param_req: [null],
      column_str: [null],
      adhoc_param_html: [null],
      std_param_html: [null],
    });
    // this.listofTables();
    this.getById(this.id);

  }
  ReportBuilder_Header;
  ReportBuilder_Line;
  lineId;
  getById(id: number) {
    this.reportBuilderService.getrbDetailsById(id).subscribe(
      (data) => {
        console.log(data);
        this.ReportBuilder_Header = data;
        console.log(data.Rpt_builder2_lines[0].model);
        this.ReportBuilder_Line = data.Rpt_builder2_lines
        this.lineId = data.Rpt_builder2_lines[0].id;
      },
      (err) => {
        console.log(err);
      }
    );
  }


  listoddatabase() {
    this.reportBuilderService.getdatabse().subscribe((data) => {
      this.databaselist = data;
      console.log('database list ', this.databaselist)

      if (this.databaselist.length == 0) {
        this.errorco = "No data Available";

      }
    }, (error) => {
      console.log(error);
      if (error) {
        this.errorco = "No data Available";
      }
    });

  }
  listofTables(val) {
    this.reportBuilderService.getTableListn(val).subscribe(data => {
      // console.log("table list "+data);
      this.tableList = data;
      console.log(this.tableList);
    }, (error) => {
      console.log(error);
      if (error) {
        this.errortb = "No data Available";
      }
    })
  }
  msg1;
  finalColList: any[] = [];
  listofcol(val) {
    console.log(this.selectedtable);
    console.log(this.selectedcol);
    console.log(this.selectedcol1);
    const tableString = JSON.stringify(val);
    console.log(tableString);
    const array = Array.of(val); // Using the Array constructor
    console.log(array);
    console.log(val);
    // this.reportBuilderService.getcolListn(this.name[1],val).subscribe((data)=>{ 
    // this.reportBuilderService.getColumnList(this.name[1],array).subscribe((data)=>{
    this.reportBuilderService.getAllColumnsFromAllTables(array).subscribe((data) => {
      console.log(data);
      this.collist = data;
      // this.finalColList.push(data);
      // this.finalColList.push(this.collist)
      if (this.selectedtable == null) {
        this.msg = 'Plz First Select Table'
      } else {
        this.msg = "";
      }

      //console.log(this.collist);
    }, (error) => {
      console.log(error);
      if (error) {
        this.errorcl = "No data Available";
      }
    })
  }
  listofquery() {
    this.reportBuilderService.getall().subscribe((data) => {
      this.querydata = data;
      console.log(this.querydata)
    })
  }
  rowdata;
  onSubmit() {
    // this.backQuery = false;

    this.query2 = this.entryForm.value.sql_query;
    console.log(this.query2);
    this.reportBuilderService.getMasterData(this.query2).subscribe((data) => {
      this.rows = data;
      console.log(this.rows);
      this.rowdata = [this.rows];
      console.log(typeof this.rows);
      if (data) {
        this.toastr.success("Run Successfully")
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
  getHeaders() {
    let headers: string[] = [];
    if (this.rows) {
      this.rows.forEach((value) => {
        Object.keys(value).forEach((key) => {
          if (!headers.find((header) => header == key)) {
            headers.push(key)
          }

        })

      })
    }
    return headers;
  }
  savequery() {
    //this.query2=this.entryForm.value.sql_query;
    console.log(this.entryForm.value);
    this.reportBuilderService.saveq(this.entryForm.value).subscribe((data) => {
      console.log(data);
    })

  }

  //tab
  addTab(selectAfterAdding: boolean) {
    this.tabs.push('Tab');

    if (selectAfterAdding) {
      this.selected.setValue(this.tabs.length - 1);
    }
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }
  opendatabsemo() {
    this.database = true;
    this.listoddatabase();
  }
  name;
  databaseName;
  databasename(val) {
    console.log(val);
    this.databaseName = val.name;
    this.selecteddatabase = val.conn_string;
    console.log(this.selecteddatabase);
    // this.selecteddatabase.substring(0,this.selecteddatabase.indexOf(':3306/'))
    // console.log(this.selecteddatabase);
    this.name = this.selecteddatabase.split(":3306/");
    console.log(this.name[1]);
    this.database = false;
    this.listofTables(this.name[1])
  }
  opentablemod() {
    this.table = true;
    // this.listofTables();
  }
  tablename(value) {
    console.log(value);
    this.selectedtable = value;
    this.table = false;
  }
  tableModal = false;
  TableData;
  opentcolmod() {
    // this.col=true;

    if (this.selectedtable == null) {
      this.msg = 'Plz First Select Table'
    } else {
      this.msg = "";
      // this.tableModal = true;
    }
    this.listofcol(this.selectedtable)

    if (Array.isArray(this.selectedtable) || this.selectedtable === undefined) {
      const selectedTables = this.selectedtable.map((table, index) => {
        const alias = String.fromCharCode(97 + (index % 26)); // Generate aliases starting from 'a'
        console.log(alias, table);
        return `${table} ${alias}`;
      }).join(',');
      console.log(selectedTables);
      // const selectedTables = this.TableData.map(({ alias, tables }) => `${tables} ${alias}`).join(',');
      // console.log(selectedTables);

      this.selectedtablequery = `SELECT * FROM ${selectedTables} WHERE 1=1`;
      console.log(this.selectedtablequery);
      // You can perform further actions with the generated SQL query
    } else {
      this.selectedtablequery = '';
      console.log(this.selectedtablequery);
      // You can perform further actions with the generated SQL query
    }

    this.selectedquery = this.selectedtablequery;

    // const defaultObject = {
    //   alias: "",
    // }
    //   const objectArray = this.selectedtable.map(value => ({
    //     ...defaultObject,
    //     tables: value,
    //   }));
    //   console.log(objectArray);
    //   const data = JSON.stringify(objectArray);
    //  try {
    //    this.TableData = JSON.parse(data);
    //    console.log('Received data:', this.TableData );
    //  } catch (e) { console.error('Invalid JSON:', data);}
  }
  opentcolmod1() {
    // this.col1=true;
    this.listofcol(this.selectedtable)


  }
  colname() {

    this.columnModal = true;

    //column filter
    const defaultObject = {
      alias: "",
    }
    const valuesOnly = this.selectedcol.map(item => item.split('.').pop());
    const objectArray = this.selectedcol.map((value, index) => ({
      // ...defaultObject,
      alias: valuesOnly[index],
      columns: value,
    }));
    console.log(objectArray);
    const data = JSON.stringify(objectArray);
    try {
      this.columnData = JSON.parse(data);
      console.log('Received data:', this.columnData);
    } catch (e) { console.error('Invalid JSON:', data); }
  }
  onAddColLines() {
    this.columnData.push({
      columns: "",
      alias: "",
    });
  }
  deleteColRow(index) {
    this.columnData.splice(index, 1);
  }
  // console.log(col);
  // this.selectedcol=col;

  onColSelected() {
    // console.log(col);
    // this.selectedcol=col;
    this.col = false;
    this.columnModal = false;
    if (Array.isArray(this.columnData)) {
      // const selectedColumns = this.columnData.join(',');
      //for column
      const selectedColumns = this.columnData.map(({ alias, columns }) => `${columns} as ${alias}`).join(',');
      console.log(selectedColumns);
      //for table
      const selectedTables = this.selectedtable.map((table, index) => {
        const alias = String.fromCharCode(97 + (index % 26)); // Generate aliases starting from 'a'
        console.log(alias, table);
        return `${table} ${alias}`;
      }).join(',');
      console.log(selectedTables);

      // const selectedTables = this.TableData.map(({ alias, tables }) => `${tables} ${alias}`).join(',');
      // console.log(selectedTables);

      this.selectcolquery = `SELECT ${selectedColumns} FROM ${selectedTables} WHERE 1=1`;
      console.log(this.selectcolquery);
      // You can perform further actions with the generated SQL query
    } else if (Array.isArray(this.selectedtable)) {
      //for table
      const selectedTables = this.selectedtable.map((table, index) => {
        const alias = String.fromCharCode(97 + (index % 26)); // Generate aliases starting from 'a'
        console.log(alias, table);
        return `${table} ${alias}`;
      }).join(',');
      console.log(selectedTables);
      this.selectcolquery = `SELECT * FROM ${selectedTables} WHERE 1=1`;
      console.log(this.selectcolquery);
      // You can perform further actions with the generated SQL query
    } else {
      // if(this.selectedtable==null){
      //   this.msg1='Plz First Select Table'
      // }else{
      //   this.msg1="";
      // }
    }
    this.selectedquery = this.selectcolquery;
  }

  //   onColSelected(){
  //   this.col=false;
  //   this.columnModal = false;
  //   console.log(this.selectedcol);
  //   if (Array.isArray(this.selectedcol)) {
  //     const selectedColumns = this.selectedcol.join(',');
  //     this.selectcolquery = `SELECT ${selectedColumns} FROM ${this.selectedtable} WHERE 1=1`;
  //     console.log(this.selectcolquery);
  //     // You can perform further actions with the generated SQL query
  //   } else {
  //     this.selectcolquery = `SELECT * FROM ${this.selectedtable} WHERE 1=1`;
  //     console.log(this.selectcolquery);
  //     // You can perform further actions with the generated SQL query
  //   }
  //   this.selectedquery = this.selectcolquery;

  //   //std pramameter
  //   const defaultObject = {
  //     label: "",
  //     dataType: "",
  //     list: "",
  //   }
  //     const objectArray = this.selectedcol.map(value => ({
  //       ...defaultObject,
  //       column: value,
  //     }));
  //     console.log(objectArray);
  //     const data = JSON.stringify(objectArray);
  //    try {
  //      this.stdParamters = JSON.parse(data);
  //      console.log('Received data:', this.stdParamters );
  //    } catch (e) { console.error('Invalid JSON:', data);}
  // }
  onAddstdLines() {
    this.stdParamters.push({
      column: "",
      label: "",
      dataType: "",
      list: ""
    });
  }
  deletestdRow(index) {
    this.stdParamters.splice(index, 1);
  }
  colname1() {
    // console.log(col);
    // this.selectedcol1=col;
    // this.col1=false;
    // this.listofquery();
  }
  openquerymod() {
    this.query = true;
    this.listofquery();
  }
  selectquery(val) {
    console.log(val);
    this.selectedquery = val;
    this.query = false;
  }
  opencopym() {
    // this.router.navigate(['cns-portal', 'reportbuild','reportQuery', this.id, 'queryadd']);
    this.router.navigate(['queryadd'], { relativeTo: this.route });
  }

  onCreate() {
    console.log(this.addForm.value);
    this.reportBuilderService.createdb(this.addForm.value).subscribe((data) => {
      console.log(data);
    })
  }

  // onSelectedChanged(selected){
  //   this.selectedTableData = this.tableList.filter(item => item.selected);
  // }
  conditionVal;
  filter(val) {

    this.filterModel = true;
    this.conditionVal = val;

    const defaultObject = {
      andor: "AND",
      //  alias: "",
      condition: "=",
      value: "",
    }
    const objectArray = this.conditionVal.map(value => ({
      ...defaultObject,
      fields_name: value,
    }));
    console.log(objectArray);
    const data = JSON.stringify(objectArray);
    try {
      this.conditionData = JSON.parse(data);
      console.log('Received data:', this.conditionData);
    } catch (e) { console.error('Invalid JSON:', data); }
  }

  onAddLines() {
    this.conditionData.push({
      andor: "AND",
      fields_name: "",
      condition: "=",
      value: ""
    });
  }
  deleteRow(index) {
    this.conditionData.splice(index, 1);
  }
  filteredConditionData;
  filterAndor;
  filtercondlvalue;
  onSelected() {
    this.filterModel = false;
    console.log(this.conditionData);
    let formattedString = '';
    for (const condition of this.conditionData) {
      const { andor, fields_name, condition: cond, value } = condition;
      formattedString += `${andor} ${fields_name} ${cond} '${value}'`;
      this.filterAndor = andor;
      this.filtercondlvalue = cond + ' ' + value;
    }
    // this.getConditionBeforeColumn(this.selectedcol1)
    // this.getConditionAfterColumn(this.selectedcol1);
    console.log(formattedString);
    this.filteredConditionData = formattedString
    if (this.selectcolquery !== undefined) {
      const mQuery = this.selectcolquery + ' ' + formattedString;
      console.log(mQuery);
      this.selectedquery = mQuery;
    } else {
      const mQuery = this.selectedtablequery + ' ' + formattedString;
      console.log(mQuery);
      this.selectedquery = mQuery;
    }
  }

  // getConditionBeforeColumn(selected: any){

  //   return this.filterAndor;


  // }
  // getConditionAfterColumn(selected: any){
  //   return this.filtercondlvalue


  // }
  onBack() {
    // this.backQuery = true;
  }

  getAliasedColumn(selected: string) {
    const index = this.selectedtable.findIndex(item => item === selected);
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const aliasIndex = index % alphabet.length; // Calculate the index based on the remainder
    const repeatedAlias = alphabet.charAt(aliasIndex);
    return repeatedAlias;
  }

  goToEdit(id) {
    this.router.navigate(["../queryedit/" + id], { relativeTo: this.route });
  }

  rowSelected: any = {};
  modaldelete = false;
  onDelete(row) {
    this.rowSelected = row;
    this.modaldelete = true;
  }

  delete(id) {
    this.modaldelete = false;
    console.log("in delete  " + id);
    this.reportBuilderService.deleteSqlModel(id).subscribe(
      (data) => {
        console.log(data);
        this.listoddatabase();
        if (data) {
          this.toastr.success('Deleted successfully');
        }
      },
      (error) => {
        console.log('Error in adding data...', +error);
        if (isNaN(error)) {
          this.toastr.success('Deleted successfully');
        } else {
          this.toastr.error('Not Deleted Data Getting Some Error');
        }
        this.listoddatabase();
      }
    );
  }


  workflow_Lines = {
    model: {}
  }
  foldername;
  dataParameter;

  saveReport() {
    // this.reportModal = true;
    this.rpt_builder();
  }

  rpt_builder() {





    this.onSaveBuidler();
  }
  onSaveBuidler() {
    this.reportModal = false;
    this.saveReportForm.value.sql_str = this.selectedquery;
    this.saveReportForm.value.date_param_req = this.dataParameter;
    this.saveReportForm.value.folderName = this.foldername;
    this.saveReportForm.value.conn_name = this.databaseName;
    const col_str = JSON.stringify(this.selectedcol);
    this.saveReportForm.value.column_str = col_str;
    const colList = JSON.stringify(this.collist);
    this.saveReportForm.value.adhoc_param_html = colList;
    const table_str = JSON.stringify(this.selectedtable);
    // this.saveReportForm.value.std_param_html = table_str;
    this.saveReportForm.value.std_param_html = col_str;

    console.log(this.saveReportForm.value);
    let tmp = JSON.stringify(this.saveReportForm.value); //.replace(/\\/g, '')
    this.workflow_Lines.model = tmp;
    // this.ReportBuilder_Header.Rpt_builder2_lines[0].model = tmp
    console.log(this.workflow_Lines);

    this.reportBuilderService.updaterbLineData(this.workflow_Lines, this.lineId).subscribe((data) => {
      console.log(data);
      if (data || data.status >= 200 && data.status <= 209) {
        this.toastr.success('Report save successfully');
        this.router.navigate(["../../all"], { relativeTo: this.route });
      }
    }, (error: HttpErrorResponse) => {
      console.log(error);
      if (error.status == 404) {
        this.toastr.error(error.error);
      }
      if (error.status == 200) { this.toastr.success('Report save successfully'); }
      if (error.status == 400) { this.toastr.error('Report Save Unsuccessful'); }
    });
    // this.router.navigate(["../../all"], { relativeTo: this.route });
  }

}
