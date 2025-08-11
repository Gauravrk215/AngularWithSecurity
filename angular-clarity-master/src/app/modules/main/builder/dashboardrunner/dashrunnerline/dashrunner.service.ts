import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRequestService } from 'src/app/services/api/api-request.service';
import baseUrl from 'src/app/services/api/helper';
import { jsPDF } from 'jspdf';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class DashrunnerService {
  constructor(private apirequest:ApiRequestService,private _http: HttpClient) { }

 


  getJsonData(api: string, jobType: string): Observable<any> {
    const url = `${baseUrl}/fnd/dashboardbuilder/getdashjson/${jobType}`;
    let params: HttpParams = new HttpParams();
    params =params.append("api",api);
    return this._http.get(url, {  params });
  }

  updateDashboardLine(dashName: any, dashboardLine: any): Observable<any> {
    return this._http.put(`${baseUrl}/fnd/dashboardbuilder/update_Dashbord_json/${dashName}`, dashboardLine);
  }

  getDashboardByName(dashname: any, json: any): Observable<any> {
    const params = new HttpParams()
      .set('dashname', dashname)
      .set('json', json);

    return this._http.get(`${baseUrl}/fnd/dashboardbuilder/get_dashboard`, { params });
  }

  getAxisDetails(): Observable<any> {
    return this._http.get(`${baseUrl}/token/Dashboardaxis`);
  }

  //////////

  resetConditions() {
    this.lineChartIds = []; // Reset the ids array to an empty array
    this.barChartIds = []; 
    this.doughnutChartIds = [];
    this.pieChartIds = [];
    this.polarareaChartIds = [];
    this.radarChartIds = [];
    this.scatterChartIds = [];
    this.bubbleChartIds = [];
    this.gridviewIds = [];
    this.todoIds = [];
}
  ////////// Line Chart
lineChartIds: any[] = [];
setlinechart(id: any) {
  this.lineChartIds.push(id);
}

getlinechart(): any[] {
  return this.lineChartIds;
}

  ////////// Bar Chart
  barChartIds: any[] = [];
  setbarchart(id: any) {
    this.barChartIds.push(id);
  }
  
  getbarchart(): any[] {
    return this.barChartIds;
  }

    ////////// Doughnut Chart
    doughnutChartIds: any[] = [];
    setdoughnutchart(id: any) {
      this.doughnutChartIds.push(id);
    }
    
    getdoughnutchart(): any[] {
      return this.doughnutChartIds;
    }

        ////////// Pie Chart
        pieChartIds: any[] = [];
        setpiechart(id: any) {
          this.pieChartIds.push(id);
        }
        
        getpiechart(): any[] {
          return this.pieChartIds;
  }

   ////////// Poral Area Chart
   polarareaChartIds: any[] = [];
   setpolarareachart(id: any) {
     this.polarareaChartIds.push(id);
   }
   
   getpolarareachart(): any[] {
     return this.polarareaChartIds;   
   }

      ////////// Radar Chart
      radarChartIds: any[] = [];
      setradarchart(id: any) {
        this.radarChartIds.push(id);
      }
      
      getradarchart(): any[] {
        return this.radarChartIds;   
      }

         ////////// Scatter Chart
   scatterChartIds: any[] = [];
   setscatterchart(id: any) {
     this.scatterChartIds.push(id);
   }
   
   getscatterchart(): any[] {
     return this.scatterChartIds;   
   }

            ////////// Bubble Chart
            bubbleChartIds: any[] = [];
            setbubblechart(id: any) {
              this.bubbleChartIds.push(id);
            }
            
            getbubblechart(): any[] {
              return this.bubbleChartIds;   
            }
       ////////// Grid View
       gridviewIds: any[] = [];
       setgridview(id: any) {
         this.gridviewIds.push(id);
       }
       
       getgridview(): any[] {
         return this.gridviewIds;   
       }     
              ////////// To do
       todoIds: any[] = [];
       settodo(id: any) {
         this.todoIds.push(id);
       }
       
       gettodo(): any[] {
         return this.todoIds;   
       }            
       


  ////////////////////////////////////////////////////////////////

  public getChartData(tableName: string, jobType: string, xAxis:any,yAxes:any ): Observable<any> {
    const url = `${baseUrl}/chart/getdashjson/${jobType}?tableName=${tableName}&xAxis=${xAxis}&yAxes=${yAxes}`;
    return this._http.get(url);
  }



  //////////////////////////////////////////////
  
  async generatePDF(content: HTMLElement, filename: string) {
    // Wait for the charts to render (adjust the delay as needed)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      // Convert the content to a data URL
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

        // Save the PDF with the custom filename
        pdf.save(filename);
      };
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  }

  // async generatePDF(content: HTMLElement, filename: string) {
  //   await new Promise((resolve) => setTimeout(resolve, 1000));

  //   try {
  //     // Convert the content to a data URL
  //     const dataUrl = await domtoimage.toPng(content);

  //     // Send a request to the server to generate the PDF
  //     const pdfData = await this._http.post<Blob>('/api/generate-pdf', { dataUrl, filename }).toPromise();

  //     // Save the PDF on the client-side
  //     saveAs(pdfData, filename);
  //   } catch (error) {
  //     console.error('Error generating PDF:', error);
  //   }
  // }

}