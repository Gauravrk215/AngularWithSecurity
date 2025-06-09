import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRequestService } from 'src/app/services/api/api-request.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private apiRequest: ApiRequestService) { }

  saveCustomer(data: any, file?: any): Observable<any> {
    const url = `token/Customer_master/Customer_master`;
    const formData = new FormData();
    formData.append('body', JSON.stringify(data));
    formData.append('file', file);

    return this.apiRequest.postFormData(url, formData);
  }

  updateCustomer(data: any, file: any,id: number): Observable<any> {
    const url = `token/Customer_master/Customer_master/${id}`;

    const formData = new FormData();
    formData.append('body', JSON.stringify(data));
    formData.append('file', file);

    return this.apiRequest.postFormData(url, formData);
  }

  getAllCustomers(): Observable<any> {
    const url = `token/Customer_master/Customer_master`;
    return this.apiRequest.get(url);
  }

  getCustomerById(id: number): Observable<any> {
    const url = `token/Customer_master/Customer_master/${id}`;
    return this.apiRequest.get(url);
  }

  deleteCustomerById(id: number): Observable<any> {
    const url = `token/Customer_master/Customer_master/${id}`;
    return this.apiRequest.delete(url);
  }




  ////////site

  // saveCustomersite(data: any, file: any): Observable<any> {
  //   const url = `Sites/Sites`;
  //   const formData = new FormData();
  //   formData.append('body', JSON.stringify(data));
  //   formData.append('file', file);

  //   return this.apiRequest.postFormData(url, formData);
  // }
  saveCustomersite(data: any): Observable<any> {
    const url = `Sites/Sites`;
    return this.apiRequest.postFormData(url, data);
  }

  // updateCustomersite(data: any, file: any,id: number): Observable<any> {
  //   const url = `Sites/Sites/${id}`;

  //   const formData = new FormData();
  //   formData.append('body', JSON.stringify(data));
  //   formData.append('file', file);

  //   return this.apiRequest.postFormData(url, formData);
  // }

  updateCustomersite(data: any,id: number): Observable<any> {
    const url = `Sites/Sites/${id}`;
    return this.apiRequest.put(url, data);
  }

  getAllCustomerssite(): Observable<any> {
    const url = `Sites/Sites`;
    return this.apiRequest.get(url);
  }

  getCustomersiteById(id: number): Observable<any> {
    const url = `Sites/Sites/${id}`;
    return this.apiRequest.get(url);
  }

  deleteCustomersiteById(id: number): Observable<any> {
    const url = `Sites/Sites/${id}`;
    return this.apiRequest.delete(url);
  }
  

  getsiteBycustId(id: number): Observable<any> {
    const url = `Sites/getSitesByCustomer/${id}`;
    return this.apiRequest.get(url);
  }



  ////// custom package

    public savecustompkgeData(data: any): Observable<any> {
      return this.apiRequest.post(`Billing/CustomPackage/CustomPackage`, data);
    }
  
    public getcustompkgDetails(): Observable<any> {
      return this.apiRequest.get(`Billing/CustomPackage/CustomPackage`);
    }
  
    public getcustompkgDetailsById(id: number): Observable<any> {
      return this.apiRequest.get(`Billing/CustomPackage/CustomPackage/${id}`);
    }
  
    public deletecustompkgById(id: number): Observable<any> {
      return this.apiRequest.delete(`Billing/CustomPackage/CustomPackage/${id}`);
    }
  
    public updatecustompkgData(data: any, id: number): Observable<any> {
      return this.apiRequest.put(`Billing/CustomPackage/CustomPackage/${id}`, data);
    }


    ///biiling total
    public billingTotal(invoiceId: number, creditNoteId:number,paymentId): Observable<any> {
      return this.apiRequest.get(`Billing/Payments/alltotall/${invoiceId}/${creditNoteId}/${paymentId}`);
    }

    public getdatabycustID(customerId: any): Observable<any> {
      return this.apiRequest.get(`token/Customer_master/getReceiptApplication/${customerId}`);
    }


    ////// list  of  items
    //generate
     getServicesBycustId(customerId: any): Observable<any> {
      return this.apiRequest.get(`token/Customer_master/getAllservices/${customerId}`);
    }

    //generate 2
    getServices2BycustId(customerId: any): Observable<any> {
      return this.apiRequest.get(`token/Customer_master/getAllservicesWithDisc/${customerId}`);
    }

    //discount and charges
        //generate
        getdiscountchargesBycustId(customerId: any): Observable<any> {
          return this.apiRequest.get(`token/Customer_master/getAllservicesWithDiscOrderlevel/${customerId}`);
        }

}
