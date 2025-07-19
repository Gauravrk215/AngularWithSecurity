import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GridsterConfig } from 'angular-gridster2';
import { ToastrService } from 'ngx-toastr';
import { DashboardContentModel, DashboardModel, WidgetModel } from '../../../../../models/builder/dashboard';
import { Dashboard3Service } from '../../../../../services/builder/dashboard3.service';
import { BarChartComponent } from '../gadgets/bar-chart/bar-chart.component';
import { BubbleChartComponent } from '../gadgets/bubble-chart/bubble-chart.component';
import { DoughnutChartComponent } from '../gadgets/doughnut-chart/doughnut-chart.component';
import { DynamicChartComponent } from '../gadgets/dynamic-chart/dynamic-chart.component';
import { FinancialChartComponent } from '../gadgets/financial-chart/financial-chart.component';
import { LineChartComponent } from '../gadgets/line-chart/line-chart.component';
import { PieChartComponent } from '../gadgets/pie-chart/pie-chart.component';
import { PolarChartComponent } from '../gadgets/polar-chart/polar-chart.component';
import { RadarChartComponent } from '../gadgets/radar-chart/radar-chart.component';
import { ScatterChartComponent } from '../gadgets/scatter-chart/scatter-chart.component';
import { ToDoChartComponent } from '../gadgets/to-do-chart/to-do-chart.component';
import { GridViewComponent } from '../gadgets/grid-view/grid-view.component';
import { DatastoreService } from 'src/app/services/fnd/datastore.service';
import { AlertsService } from 'src/app/services/fnd/alerts.service';
import { isArray } from 'highcharts';
// import { ChartItem } from '../chartitem';

function isNullArray(arr) {
  return !Array.isArray(arr) || arr.length === 0;
}

@Component({
  selector: 'app-editnewdash',
  templateUrl: './editnewdash.component.html',
  styleUrls: ['./editnewdash.component.scss']
})



export class EditnewdashComponent implements OnInit {

  editId:number;
  toggle:boolean;
  modeledit:boolean = false;
  public entryForm: FormGroup;

  WidgetsMock: WidgetModel[] = [
    {
        name: 'Radar Chart',
        identifier: 'radar_chart'
    },
    {
        name: 'Doughnut Chart',
        identifier: 'doughnut_chart'
    },
    {
        name: 'Line Chart',
        identifier: 'line_chart'
    },
	{
		name: 'Bar Chart',
		identifier: 'bar_chart'
	  },
	  {
		name: 'Pie Chart',
		identifier: 'pie_chart'
	  },
	  {
		name: 'Polar Area Chart',
		identifier: 'polar_area_chart'
	  },
	  {
		name: 'Bubble Chart',
		identifier: 'bubble_chart'
	  },
	  {
		name: 'Scatter Chart',
		identifier: 'scatter_chart'
	  },
	  // {
		// name: 'Dynamic Chart',
		// identifier: 'dynamic_chart'
	  // },
	  // {
		// name: 'Financial Chart',
		// identifier: 'financial_chart'
	  // },
	  {
		name: 'To Do',
		identifier: 'to_do_chart'
	  },
    {
      name: 'Grid View',
      identifier: 'grid_view'
      }
]

  public options: GridsterConfig;
	protected dashboardId: number;
	protected dashboardCollection: DashboardModel;
	//dashboardCollection:any;
	protected dashboardCollection1: DashboardModel[];
	public dashboardArray: DashboardContentModel[];
  public dashArr:[];

	protected componentCollection = [
		{ name: "Line Chart", componentInstance: LineChartComponent },
		{ name: "Doughnut Chart", componentInstance: DoughnutChartComponent },
		{ name: "Radar Chart", componentInstance: RadarChartComponent },
		{ name: "Bar Chart", componentInstance: BarChartComponent },
		{ name: "Pie Chart", componentInstance: PieChartComponent },
		{ name: "Polar Area Chart", componentInstance: PolarChartComponent },
		{ name: "Bubble Chart", componentInstance: BubbleChartComponent },
		{ name: "Scatter Chart", componentInstance: ScatterChartComponent },
		{ name: "Dynamic Chart", componentInstance: DynamicChartComponent },
		{ name: "Financial Chart", componentInstance: FinancialChartComponent },
		{ name: "To Do Chart", componentInstance: ToDoChartComponent },
    { name: "Grid View", componentInstance: GridViewComponent },
	];
  model:any;
  linesdata:any;
  id:any;
  gadgetsEditdata = {
    donut : '',
    chartlegend: '',
    showlabel : '',
    charturl: '',
    chartparameter : '',
    datastore : '',
    table:'',
    datasource : '',
    charttitle:'',
    id:'',
    fieldName:'',
    chartcolor:'',
    slices:'',
    yAxis:'',
    xAxis:''

};
  constructor(private route: ActivatedRoute,
    private router : Router,
      private dashboardService: Dashboard3Service,
    private toastr:ToastrService,
    private _fb: FormBuilder,
    private datastoreService: DatastoreService,
    private alertService:AlertsService,) { }

    ngOnInit(): void {

      // Grid options
      this.options = {
        gridType: "fit",
        enableEmptyCellDrop: true,
        emptyCellDropCallback: this.onDrop,
        pushItems: true,
        swap: true,
        pushDirections: { north: true, east: true, south: true, west: true },
        resizable: { enabled: true },
        itemChangeCallback: this.itemChange.bind(this),
        draggable: {
          enabled: true,
          ignoreContent: true,
          dropOverItems: true,
          dragHandleClass: "drag-handler",
          ignoreContentClass: "no-drag",
        },
        displayGrid: "always",
        minCols: 10,
        minRows: 10
      };
      this.getData();

      this.editId = this.route.snapshot.params.id;
      console.log(this.editId);
      this.dashboardService.getById(this.editId).subscribe((data)=>{
        console.log("ngOnInit",data);
        this.linesdata = data;
        this.id = data.dashbord1_Line[0].id;
        console.log("this.id ",this.id);
      },
      (error: any)=>{

      }
      );

      this.entryForm = this._fb.group({
        donut : [null],
        chartlegend: [null],
        showlabel : [null],
        charturl: [null],
        chartparameter : [null],
        datastore:[null],
        table:[null],
        fieldName: [null],
        datasource : [null],
        charttitle:[null],
        id:[null],
        chartcolor:[null],
        slices:[null],
        yAxis:[null],
        xAxis: [null],
        });
    }

    toggleMenu() {
      this.toggle = !this.toggle;
    }

    onDrag(event, identifier) {
    console.log("on drag",identifier);
    console.log("on drag ",event);
      event.dataTransfer.setData('widgetIdentifier', identifier);
    }
    datagadgets:any;
    dashboardLine:any;
    dashboardName:any;
    getData() {
      // We get the id in get current router dashboard/:id
      this.route.params.subscribe(params => {
        // + is used to cast string to int
        this.dashboardId = +params["id"];
        // We make a get request with the dashboard id
        this.dashboardService.getById(this.dashboardId).subscribe(dashboard => {
          // We fill our dashboardCollection with returned Observable
          this.dashboardName = dashboard.dashboard_name;
          this.datagadgets = dashboard;
          this.dashboardLine = dashboard.dashbord1_Line;
          //this.dashboardCollection = dashboard.dashbord1_Line.model;
          console.log("this.datagadgets",this.datagadgets);
          console.log("this.dashboardLine",this.dashboardLine);
          this.dashboardCollection =JSON.parse(this.dashboardLine[0].model) ;
          //this.dashboardCollection =this.dashboardLine[0].model ;
          console.log("this.dasboard  ",this.dashboardCollection );
          console.log(this.dashboardCollection);
          // We parse serialized Json to generate components on the fly
          this.parseJson(this.dashboardCollection);
          // We copy array without reference
          this.dashboardArray = this.dashboardCollection.dashboard.slice();
          console.log("this.dashboardArray",this.dashboardArray);
        });
      });


    }

    // Super TOKENIZER 2.0 POWERED BY NATCHOIN
    parseJson(dashboardCollection: DashboardModel) {
      // We loop on our dashboardCollection
      dashboardCollection.dashboard.forEach(dashboard => {
        // We loop on our componentCollection
        this.componentCollection.forEach(component => {
          // We check if component key in our dashboardCollection
          // is equal to our component name key in our componentCollection
          if (dashboard.component === component.name) {
            // If it is, we replace our serialized key by our component instance
            dashboard.component = component.componentInstance;
          }
        });
      });
    }

    serialize(dashboardCollection) {
      // We loop on our dashboardCollection
      dashboardCollection.forEach(dashboard => {
        // We loop on our componentCollection
        this.componentCollection.forEach(component => {
          // We check if component key in our dashboardCollection
          // is equal to our component name key in our componentCollection
          if (dashboard.name === component.name) {
            dashboard.component = component.name;
          }
        });
      });
    }

    itemChange() {
      this.dashboardCollection.dashboard = this.dashboardArray;
      console.log("itemChange this.dashboardCollection.dashboard ",this.dashboardCollection.dashboard);
      console.log("itemChange this.dashboardCollection ",this.dashboardCollection);
      console.log("itemChange this.dashboardCollection type",typeof this.dashboardCollection);
      console.log("itemChange this.dashboardArray ",this.dashboardArray);
      let tmp = JSON.stringify(this.dashboardCollection);
      console.log("temp data",tmp);
      let parsed: DashboardModel = JSON.parse(tmp);
      console.log("parsed data",parsed);
      console.log("let parsed ",typeof parsed);
      this.serialize(parsed.dashboard);
      console.log("item chnage function ", typeof this.dashboardArray);
      //this._ds.updateDashboard(this.dashboardId, parsed).subscribe();
    }

    onDrop(ev) {
      const componentType = ev.dataTransfer.getData("widgetIdentifier");
      let maxChartId = this.dashboardArray?.reduce((maxId, item) => Math.max(maxId, item.chartid), 0);
      switch (componentType) {
        case "radar_chart":
          return this.dashboardArray.push({
            cols: 5,
            rows: 6,
            x: 0,
            y: 0,
            chartid:maxChartId + 1,
            component: RadarChartComponent,
            name: "Radar Chart"
          });
        case "line_chart":
          return this.dashboardArray.push({
            cols: 5,
            rows: 7,
            x: 0,
            y: 0,
            chartid:maxChartId + 1,
            component: LineChartComponent,
            name: "Line Chart"
          });
        case "doughnut_chart":
          return this.dashboardArray.push({
            cols: 5,
            rows: 6,
            x: 0,
            y: 0,
            chartid:maxChartId + 1,
            component: DoughnutChartComponent,
            name: "Doughnut Chart"
          });
        case "bar_chart":
          return this.dashboardArray.push({
            cols: 5,
            rows: 6,
            x: 0,
            y: 0,
            chartid:maxChartId + 1,
            component: BarChartComponent,
            name: "Bar Chart"
        });
        case "pie_chart":
          return this.dashboardArray.push({
            cols: 5,
            rows: 6,
            x: 0,
            y: 0,
            chartid:maxChartId + 1,
            component: PieChartComponent,
            name: "Pie Chart"
        });
        case "polar_area_chart":
          return this.dashboardArray.push({
            cols: 5,
            rows: 6,
            x: 0,
            y: 0,
            chartid:maxChartId + 1,
            component: PolarChartComponent,
            name: "Polar Area Chart"
        });
        case "bubble_chart":
          return this.dashboardArray.push({
            cols: 5,
            rows: 6,
            x: 0,
            y: 0,
            chartid:maxChartId + 1,
            component: BubbleChartComponent,
            name: "Bubble Chart"
        });
        case "scatter_chart":
          return this.dashboardArray.push({
            cols: 5,
            rows: 6,
            x: 0,
            y: 0,
            chartid:maxChartId + 1,
            component: ScatterChartComponent,
            name: "Scatter Chart"
        });
        case "dynamic_chart":
          return this.dashboardArray.push({
            cols: 5,
            rows: 6,
            x: 0,
            y: 0,
            chartid:maxChartId + 1,
            component: DynamicChartComponent,
            name: "Dynamic Chart"
        });
        case "financial_chart":
          return this.dashboardArray.push({
            cols: 5,
            rows: 6,
            x: 0,
            y: 0,
            chartid:maxChartId + 1,
            component: FinancialChartComponent,
            name: "Financial Chart"
        });
        case "to_do_chart":
          return this.dashboardArray.push({
            cols: 5,
            rows: 5,
            x: 0,
            y: 0,
            chartid:maxChartId + 1,
            component: ToDoChartComponent,
            name: "To Do Chart"
        });
        case "grid_view":
          return this.dashboardArray.push({
            cols: 5,
            rows: 5,
            x: 0,
            y: 0,
            chartid:maxChartId + 1,
            component: GridViewComponent,
            name: "Grid View"
        });
      }
    }
    removeItem(item) {
      this.dashboardArray.splice(
        this.dashboardArray.indexOf(item),
        1
      );
      this.itemChange();
    }

      changedOptions() {
      this.options.api.optionsChanged();
    }

    modelid:number ;
    editGadget(item)
    {
      this.modeledit = true;
      this.modelid = item.chartid;
      console.log(this.modelid);
      this.gadgetsEditdata = item;
      this.gadgetsEditdata.fieldName = item.name;
      if(item.showlabel === undefined){  item.showlabel = true; }
      if(item.chartcolor === undefined ){  item.chartcolor = true;} 
      if(item.chartlegend === undefined){ item.chartlegend = true; }
      this.getStores();
      if(item.datastore !== undefined || '' || null){
      const datastore = item.datastore;
      this.getTables(datastore);
      const table = item.table;
      this.getColumns(datastore,table);
      console.log(item.yAxis);
      if(isArray(item.yAxis)){
      this.selectedyAxis = item.yAxis;
      console.log( this.selectedyAxis);
      }
      }else{
        this.selectedyAxis = [];
      }
      console.log(item);
    }

    dashbord1_Line = {
      //model:JSON.stringify(this.da),
      model:''
      }


    UpdateLine()
    {
    console.log('Add button clicked.......');
    console.log(this.dashboardArray);
    console.log(this.dashboardCollection);
    console.log(typeof this.dashboardCollection);
    console.log(this.id);
     //this.dashbord1_Line.model = JSON.stringify(this.dashboardCollection);

  //https://www.w3schools.com/js/tryit.asp?filename=tryjson_stringify_function_tostring

let cmp=this.dashboardCollection.dashboard.forEach(dashboard=>{
  this.componentCollection.forEach(component=>{
    if (dashboard.name === component.name) {
      dashboard.component = component.name;
    }  })
})
console.log(cmp);

    let tmp = JSON.stringify(this.dashboardCollection);
  //   var merged = this.dashboardArray.reduce((current, value, index) => {
  //     if(index > 0)
  //         current += ',';

  //     return current + value.component;
  // }, '');

  //console.log(merged);
     console.log("temp data",typeof tmp);
     console.log(tmp);
     let parsed= JSON.parse(tmp);
     this.serialize(parsed.dashboard);
    this.dashbord1_Line.model = tmp;

  // let obj = this.dashboardCollection;
  // obj[1].component = obj[1].component.toString();
  // let myJSON = JSON.stringify(obj);
  // this.dashbord1_Line.model = myJSON;

    console.log("line data in addgadget ",this.dashbord1_Line);
    console.log("line data in addgadget type ",typeof this.dashbord1_Line);
    console.log("line model data ",this.dashbord1_Line.model);
    console.log("line model data type",typeof this.dashbord1_Line.model);
      this.dashboardService.UpdateLineData(this.id,this.dashbord1_Line).subscribe(
        (data: any)=>{
          console.log('Updation Successful...');
          this.ngOnInit();
      console.log(data);
      this.router.navigate(["../../all"], { relativeTo: this.route })
        }
      );
      // if (data) {
      //   this.toastr.success('Updated successfully');
      //       }
    }

    onSubmit(id)
    {
    console.log(id);
    if (!isNullArray(this.selectedyAxis)) {
      console.log("get y-axis array", this.selectedyAxis);
      this.entryForm.patchValue({ yAxis: this.selectedyAxis });
    }
    let formdata = this.entryForm.value;
    let num = id;
    console.log(this.entryForm.value);
      this.dashboardCollection.dashboard = this.dashboardCollection.dashboard.map(item => {
      if(item.chartid == num)
        {
        //item["product_id"] = "thisistest";
        const xyz = {...item,...formdata}
        console.log(xyz);
        return xyz;
        }
        return item
        });
      console.log(this.dashboardCollection.dashboard);
        this.modeledit = false;

       // this.entryForm.reset();

     }
     goBack(){
      this.router.navigate(["../../all"], { relativeTo: this.route })
     }

     onSchedule(){
      this.router.navigate(['../../schedule/'+ this.editId],{relativeTo:this.route});
     } 

    
     ///////
     storedata;
     getStores(){
       this.datastoreService.getAll().subscribe((data) => {
         console.log(data);
         this.storedata = data;
       },(error) => {
         console.log(error);
       });
     }

     selectedStoreId;
     storename(val){
       console.log(val);
       this.selectedStoreId = val;
       this.getTables(this.selectedStoreId);
     }

     TableData;
     getTables(id){
       this.alertService.getTablefromstore(id).subscribe(gateway =>{
         console.log(gateway);
         this.TableData = gateway;
       },(error)=>{
         console.log(error);
       });
     }

     tablename(val){
      console.log(val);
      this.getColumns(this.selectedStoreId,val);
    }
    selectedyAxis;
    columnData;
    getColumns(id,table){
      this.alertService.getColumnfromurl(table).subscribe(data =>{
        console.log(data);
        this.columnData = data;
      },(error)=>{
        console.log(error);
      });
    }


    // toggleAddToDashboard(item) {
    //   item.addToDashboard = item.addToDashboard;
    // }

    // getChartDataForToggleSwitchTrue() {
    //   for (let i = 0; i < this.dashArr.length; i++) {
    //     if (this.dashArr[i].addToDashboard) {
    //       this.dashboardService.getChartData(
    //         this.dashArr[i].charturl, // Assuming charturl is the correct property to pass as a string
    //         true  // Pass true to indicate fetching charts with toggle switch set to true
    //       ).subscribe(tData => {
    //         console.log(tData);
    //         // this.dashArr[i].featchData = tData;
    //       });
    //     }
    //   }
    // }
    


}
