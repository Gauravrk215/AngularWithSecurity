import { Component, OnInit,  ViewChild, ElementRef  } from '@angular/core';
import { ChartDataset, ChartType } from 'chart.js';
import { DashrunnerService } from './dashrunner.service';
import { GridsterConfig, GridsterItem, GridsterItemComponentInterface } from 'angular-gridster2';
import { DoughnutRunnerComponent } from './doughnut-runner/doughnut-runner.component';
import { LineRunnerComponent } from './line-runner/line-runner.component';
import { BarRunnerComponent } from './bar-runner/bar-runner.component';
import { DashboardContentModel } from 'src/app/models/builder/dashboard';
import { GridRunnerComponent } from './grid-runner/grid-runner.component';
import { Dashboard3Service } from 'src/app/services/builder/dashboard3.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TodoRunnerComponent } from './todo-runner/todo-runner.component';
import { jsPDF } from 'jspdf';
import domtoimage from 'dom-to-image';
import { PieRunnerComponent } from './pie-runner/pie-runner.component';
import { BubbleRunnerComponent } from './bubble-runner/bubble-runner.component';
import { ScatterRunnerComponent } from './scatter-runner/scatter-runner.component';
import { PolarRunnerComponent } from './polar-runner/polar-runner.component';
import { RadarRunnerComponent } from './radar-runner/radar-runner.component';

@Component({
  selector: 'app-dashrunnerline',
  templateUrl: './dashrunnerline.component.html',
  styleUrls: ['./dashrunnerline.component.scss']
})
export class DashrunnerlineComponent implements OnInit {
  @ViewChild('contentContainer') contentContainerRef!: ElementRef;
  // @ViewChild('contentContainer', {static:false}) el!: ElementRef;
  public options: GridsterConfig;
  workflowLine:any;
  editId;
  public DashtestboardArray: DashboardContentModel[] = [

 
 ];
  componentCollection = [
  { name: "Line Chart", componentInstance: LineRunnerComponent },
  { name: "Doughnut Chart", componentInstance: DoughnutRunnerComponent },
  { name: "Bar Chart", componentInstance: BarRunnerComponent },
  { name: "Pie Chart", componentInstance: PieRunnerComponent },
  { name: "Bubble Chart", componentInstance: BubbleRunnerComponent },
  { name: "Scatter Chart", componentInstance: ScatterRunnerComponent },
  { name: "Polar Area Chart", componentInstance: PolarRunnerComponent },
  { name: "Radar Chart", componentInstance: RadarRunnerComponent },
  { name: "Grid View", componentInstance: GridRunnerComponent },
  { name: "To Do Chart", componentInstance: TodoRunnerComponent },
];

  constructor(private Dashtestservive:DashrunnerService, private dashboardService: Dashboard3Service,private route: ActivatedRoute,
    private router : Router,) { }

  ngOnInit(): void {

    
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Reset conditions when navigation changes
        this.Dashtestservive.resetConditions();
      }
    });
    
    this.options = {
      gridType: 'fit',
      enableEmptyCellDrop: true,
      pushItems: true,
      swap: true,
      pushDirections: { north: true, east: true, south: true, west: true },
      resizable: { enabled: true },
      draggable: {
        enabled: true,
        ignoreContent: true,
        dropOverItems: true,
        dragHandleClass: 'drag-handler',
        ignoreContentClass: 'no-drag',
      },
      displayGrid: 'onDrag&Resize', //always
      minCols: 10,
      minRows: 10,
    };
    this.editId = this.route.snapshot.params.id;
    console.log(this.editId);
    this.getbyId(this.editId);
  }
//getbyname
dashboard_name = "Dashtest";
  getbyId(id){
    this.dashboardService.getById(id).subscribe((data)=>{
      console.log(data);
      this.workflowLine = data.dashbord1_Line[0].model;
      this.dashboard_name = data.dashboard_name;
      if(this.workflowLine == "" || this.workflowLine == null){
        console.log("default json");
        const defaultJson = [
          {
                  cols: 3,
                  rows: 5,
                  x: 0,
                  y: 0,
                  chartid: 3,
                  name: 'Doughnut Chart',
                  component: 'Doughnut Chart',
                },
            {
                  cols: 3,
                  rows: 5,
                  x: 0,
                  y: 0,
                  chartid: 3,
                  name: 'Line Chart',
                  component: 'Line Chart',
                },
            {
                  cols: 3,
                  rows: 5,
                  x: 0,
                  y: 0,
                  chartid: 3,
                  name: 'Bar Chart',
                  component: 'Bar Chart',
                },
            {
                  cols: 3,
                  rows: 5,
                  x: 0,
                  y: 0,
                  chartid: 3,
                  name: 'Grid View',
                  component: 'Grid View',
                },
            {
                  cols: 3,
                  rows: 5,
                  x: 0,
                  y: 0,
                  chartid: 3,
                  name: 'To Do Chart',
                  component: 'To Do Chart',
                }
              ]
              this.workflowLine = JSON.stringify(defaultJson);
        }
        console.log(this.workflowLine);
        if(this.workflowLine)
        {
          console.log(this.workflowLine);
          const dash = JSON.parse(this.workflowLine) ;
          this.DashtestboardArray = dash.dashboard;
          console.log(this.DashtestboardArray);
          this.parseJson(this.DashtestboardArray);
        }
 
    },(error)=>{
      console.log(error);
    });
  }

  parseJson(DashtestboardArray: any) {
    DashtestboardArray.forEach(dashboard => {
      this.componentCollection.forEach(component => {
        if (dashboard.component === component.name) {
          dashboard.component = component.componentInstance;
        }
      });
    });
  } 


  dashbord1_Line = {
    model:''
    }

  update(){
    console.log(this.DashtestboardArray);

    let cmp=this.DashtestboardArray.forEach(dashboard=>{
      this.componentCollection.forEach(component=>{
        if (dashboard.name === component.name) {
          dashboard.component = component.name;
        }  })
    })

    console.log(cmp);

    let tmp = JSON.stringify(this.DashtestboardArray);
   this.dashbord1_Line.model = tmp;

    this.Dashtestservive.updateDashboardLine(this.dashboard_name, this.dashbord1_Line).subscribe((data)=>{
      console.log(data);
    });

    window.location.reload();
    // this.parseJson(this.DashtestboardArray);
  }


  //Resizabel and drag
  resizable: boolean = false;
  toggleResizable() {
    this.resizable = !this.resizable;
    if (this.resizable == true) {
      this.options = {
        resizable: { enabled: false },
      };
    } else {
      this.options = {
        resizable: { enabled: true },
      };
    }
  }

  // generatePDF(){
  //   let pdf = new jsPDF('p','pt','a4');
  //   pdf.html(this.el.nativeElement,{
  //     callback: (pdf)=>{
  //       pdf.save("demo.pdf");
  //     }
  //   })
  // }


  // async generatePDF() {
  //   const content = this.contentContainerRef.nativeElement;

  //   // Wait for the charts to render (adjust the delay as needed)
  //   await new Promise((resolve) => setTimeout(resolve, 1000));

  //   try {
  //     // Convert the content to canvas (using html2canvas)
  //     const canvas = await html2canvas(content);

  //     const pdf = new html2pdf.default();
  //     const options = {
  //       margin: 10,
  //       filename: 'dashboard.pdf',
  //       image: { type: 'jpeg', quality: 0.98 },
  //       jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  //     };

  //     // Convert the canvas to PDF and save
  //     await pdf.from(canvas).set(options).outputPdf().then((pdfOutput: any) => {
  //       // Convert the PDF output to a Blob
  //       const pdfBlob = new Blob([pdfOutput], { type: 'application/pdf' });

  //       // Save the Blob as a file using FileSaver.js
  //       saveAs(pdfBlob, 'dashboard.pdf');
  //     });
  //   } catch (error) {
  //     console.error('Error generating PDF:', error);
  //   }
  // }

  async generatePDF() {
    const content = this.contentContainerRef.nativeElement;

    // Wait for the charts to render (adjust the delay as needed)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      // Convert the content to a data URL (using dom-to-image)
      const dataUrl = await domtoimage.toPng(content);

      // Convert data URL to image
      const img = new Image();
      img.src = dataUrl;

      img.onload = () => {
        const pdf = new jsPDF();
        const imgWidth = 210; // A4 size (width in mm)
        const imgHeight = (img.height * imgWidth) / img.width;

        // Add the image to the PDF
        pdf.addImage(img, 'PNG', 0, 0, imgWidth, imgHeight);
        // pdf.save('dashboard.pdf');
        const pdfName = this.dashboard_name + '.pdf'
        pdf.save(pdfName)
      };
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  }

  // Export(name){
  //   console.log(name);
  //   this.dashboardService.setName(name);
  // }

  onButtonClicked(): void {
    console.log('Button clicked in SomeComponent');
    // Add your custom logic here when the button is clicked in SomeComponent
  }
}
