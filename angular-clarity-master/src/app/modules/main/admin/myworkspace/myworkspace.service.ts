import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { ApiRequestService } from 'src/app/services/api/api-request.service';
import baseUrl from 'src/app/services/api/helper';

@Injectable({
  providedIn: 'root'
})
export class MyworkspaceService {
  public localStorage: Storage = localStorage;
  constructor(private _http: HttpClient,private apiRequest: ApiRequestService) { }
  public add(r: any){
    return this._http.post(`${baseUrl}/api/menu-register`, r);
  }

  public getall(){
    return this._http.get(`${baseUrl}/Workspace_team/SecTeam/AccountId`);
  }
  public getalluser(){
    return this._http.get(`${baseUrl}/User_workSpace/GetAllUser`);
  }
  public getallguest(){
    return this._http.get(`${baseUrl}/User_workSpace/GetAllGuest`);
  }
  public adduser(email:any){
    let params: HttpParams = new HttpParams();
    params = params.append("email", email);
    return this._http.post(`${baseUrl}/api/userviaadmin`,params);
  }
  storeEmail(email: string) {
    this.localStorage.setItem("registeredEmail", email);
  }
  //Store userinfo from session storage

  //Get email from session storage ( WILL REMOVE AFTER REGISTER)
  getStoredEmail(): string | null {
    try {
      let email: string = this.localStorage.getItem(
       "registeredEmail"
      );
      if (email) {
        return email;
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  }
  adduserdetails(data:any,token:any):Observable<any>{
    return this._http.post(`${baseUrl}/api/admin/adduser/${token}`,data);
  }

  addguest(email:any,duration:any){
    let params: HttpParams = new HttpParams();
    params = params.append("email", email);
    params=params.append("access_duration",duration)
    return this._http.post(`${baseUrl}/api/guest_via_admin`,params);
  }

  addguestdetails(data:any,token:any):Observable<any>{
    return this._http.post(`${baseUrl}/api/admin/addguest/${token}`,data);
  }
  addteam(data:any){
    return this._http.post(`${baseUrl}/Workspace_team/SecTeam`,data);
  }
  public getallteammeme(id:any){
    return this._http.get(`${baseUrl}/User_workSpace/GetAllMember/${id}`);
  }
  getallusertosameaccid(){
    return this._http.get(`${baseUrl}/User_workSpace/GetAll/AccountId`);
  }
  addteammem(id:any,user_id:any,data:any){
    return this._http.post(`${baseUrl}/User_workSpace/add_team/${id}/${user_id}`,data);
  }
  getallworkspace(){
    return this._http.get(`${baseUrl}/Workspace_workspace/FindByaccount`);
  }
  addsecworkspaceuser(usrid:any,id:any,data:any,){
    return this._http.post(`${baseUrl}/workspace/secworkspaceuser/add_workspace/users/${usrid}/${id}`,data);
  }
  addsecworkteam(pid:any,tid:any,data:any){
    return this._http.post(`${baseUrl}/workspace/secworkspaceuser/addteam/${pid}/${tid}`,data);
  }
  getallsecworkspace(id:any):Observable<any>{
    return this._http.get(`${baseUrl}/workspace/secworkspaceuser/get_by_projectid/${id}`);
  }
  // public getById(id: any){
  //   return this._http.get(`${baseUrl}/api/menu-register/${id}`);
  // }

  // public update(id:any, reg:any){
  //   return this._http.put(`${baseUrl}/api/menu-register/${id}`, reg);
  // }

  // public deleteById(id: any){
  //   return this._http.delete(`${baseUrl}/api/menu-register/${id}`);
  // }



////////////////////project users

addprojectuser(userId: any, projectId: any, duration: any, role: string):Observable<any> {
  const params = new HttpParams().set('role', role);
  return this._http.post(`${baseUrl}/workspace/secworkspaceuser/add_workspace/users/${userId}/${projectId}/${duration}`, {}, { params });
}

///for team
public addprojectteam(projectId:any,teamId:any){
  return this._http.post(`${baseUrl}/workspace/secworkspaceuser/addteam/${projectId}/${teamId}`, {});
}
}
