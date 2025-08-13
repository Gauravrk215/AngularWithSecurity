import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { baseColors } from 'ng2-charts';
import { ChartDataset, ChartType } from 'chart.js';
import { DashrunnerService } from '../dashrunner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Dashboard3Service } from 'src/app/services/builder/dashboard3.service';
import { DashboardContentModel } from 'src/app/models/builder/dashboard';
import { jsPDF } from 'jspdf';
import domtoimage from 'dom-to-image';
@Component({
  selector: 'app-line-runner',
  templateUrl: './line-runner.component.html',
  styleUrls: ['./line-runner.component.scss']
})
export class LineRunnerComponent implements OnInit {
  @ViewChild('contentContainer') contentContainerRef!: ElementRef;
  @Output() buttonClicked = new EventEmitter<void>();
  editId;
  public DashtestboardArray: DashboardContentModel[] = [
  ];
  workflowLine;
  TableName;
  XAxis;
  YAxis;
  showlabel;

  JsonData;
  lineChartData: ChartDataset[] = [];
  lineChartLabels:any[] = [];
  lineChartNoLabels: any[] = [];
  lineCharData = 
    {
      "chartData": [
        { "data": [85, 72, 78, 75, 77, 75, 43,85, 72, 78, 75, 77, 75, 43], "label": "Test Projects" }
      ],
      "chartLabels": ["Jan", "Feb", "March", "April", "May", "June","july","Jan", "Feb", "March", "April", "May", "June","july"]
    }

  lineChartOptions = {
    // plugins: {
    //   colors: {
    //     forceOverride: true
    //   }
    // },
    responsive: true,
  };
  lineChartColors:any[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

   lineChartLegend = false;
  lineChartPlugins = [];
  lineChartType = 'line';
  constructor(private Dashtestservive:DashrunnerService,private route: ActivatedRoute,private dashboardService: Dashboard3Service,
    private router : Router,) { }

  ngOnInit(): void {

    this.lineChartData = this.lineCharData.chartData;
      this.lineChartLabels = this.lineCharData.chartLabels;

      this.editId = this.route.snapshot.params.id;
      console.log(this.editId);


      this.dashboardService.getById(this.editId).subscribe((data)=>{
        console.log(data);
        this.workflowLine = data.dashbord1_Line[0].model;
        const dash = JSON.parse(this.workflowLine) ;
        // this.DashtestboardArray = dash.dashboard;
        // console.log(this.DashtestboardArray);

        const ChartObject = dash.dashboard.filter(obj => obj.name === "Line Chart");
        console.log(ChartObject);
        for (let i = 0; i < ChartObject.length; i++) {
          const ids = this.Dashtestservive.getlinechart();
          // console.log(ids);
          if (ids.includes(ChartObject[i].chartid)) {
            // If the chartid is already in the ids array, continue to the next iteration
            continue;
          }
          this.Dashtestservive.setlinechart(ChartObject[i].chartid);
          const id = ids[i];
          console.log(id);
        
          if (ChartObject[i].chartid === id) {
            this.TableName = ChartObject[i].table;
            this.XAxis = ChartObject[i].xAxis;
            this.YAxis = ChartObject[i].yAxis;
            this.showlabel = ChartObject[i].showlabel;
            this.lineChartLegend = ChartObject[i].chartlegend;
            console.log(this.TableName);
            this.Dashtestservive.getChartData(this.TableName,"Line Chart",this.XAxis,this.YAxis).subscribe((Ldata) => {
              console.log(Ldata);
              this.JsonData = Ldata;
              this.lineChartData = this.JsonData.chartData;
              this.lineChartLabels = this.JsonData.chartLabels;
              
             },(error) => {
              console.log(error);
             });
            break; // No need to continue the loop once the correct placeholder is found
          }
        }
      });

    //   setTimeout(() => {
    // // this.Dashtestservive.getJsonData("http://localhost:9292/token/Dashboardaxis/7","Line Chart").subscribe(Ldata => {
    //   this.Dashtestservive.getChartData(this.TableName,"Line Chart",this.XAxis,this.YAxis).subscribe((Ldata) => {
    //   console.log(Ldata);
    //   this.JsonData = Ldata;
    //   this.lineChartData = this.JsonData.chartData;
    //   this.lineChartLabels = this.JsonData.chartLabels;
      
    //  },(error) => {
    //   console.log(error);
    //  });

    // }, 500);

  //  const name = this.dashboardService.getName()
  //     // Here, you can execute the method based on the received name
  //     if (name === 'Line Chart') {
  //       this.generatePDF();
  //     }
  }
  
  generatePDFFile(){
    this.buttonClicked.emit();
    const content = this.contentContainerRef.nativeElement;
    const filename = 'linechart.pdf'; // You can provide any desired filename here

    this.Dashtestservive.generatePDF(content, filename);
  }

  // async generatePDF() {
  //   const content = this.contentContainerRef.nativeElement;

  //   // Wait for the charts to render (adjust the delay as needed)
  //   await new Promise((resolve) => setTimeout(resolve, 1000));

  //   try {
  //     // Convert the content to a data URL (using dom-to-image)
  //     const dataUrl = await domtoimage.toPng(content);

  //     // Convert data URL to image
  //     const img = new Image();
  //     img.src = dataUrl;

  //     img.onload = () => {
  //       const pdf = new jsPDF();
  //       const imgWidth = 210; // A4 size (width in mm)
  //       const imgHeight = (img.height * imgWidth) / img.width;

  //       // Add the image to the PDF
  //       pdf.addImage(img, 'PNG', 0, 0, imgWidth, imgHeight);
  //       pdf.save('linechart.pdf');
  //       // const pdfName = this.dashboard_name + '.pdf'
  //       // pdf.save(pdfName)
  //     };
  //   } catch (error) {
  //     console.error('Error generating PDF:', error);
  //   }
  // }

}