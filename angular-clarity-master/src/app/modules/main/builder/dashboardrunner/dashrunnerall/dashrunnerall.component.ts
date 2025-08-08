import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { WireframeService } from 'src/app/services/builder/wireframe.service';
import { ExcelService } from 'src/app/services/excel.service';
import { Dashboard3Service } from '../../../../../services/builder/dashboard3.service';
import * as moment from 'moment';
import { ModulesetupService } from 'src/app/services/builder/modulesetup.service';
@Component({
  selector: 'app-dashrunnerall',
  templateUrl: './dashrunnerall.component.html',
  styleUrls: ['./dashrunnerall.component.scss']
})
export class DashrunnerallComponent implements OnInit {
  addModall:boolean = false;
  selected:any[] = [];
  loading = false;
  data:any;
  id:any;
  moduleId:any;
  modalDelete = false;
  rowSelected :any= {};
  rows: any[];
  projectname;
  projectId;
  error;
  constructor(
    private router : Router,
    private route: ActivatedRoute,private dashboardService : Dashboard3Service,
    // private wireframeservice : WireframeService,
    private excel: ExcelService,private mainService: ModulesetupService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    // this.projectId=this.wireframeservice.getProjectId();
    console.log(this.projectId);
    this.id = this.route.snapshot.params["id"]; // fb_header_id
    // this.moduleId = this.wireframeservice.getModuleId(); // get from session storage
    console.log(this.moduleId);

    this.getdashboard();
    // this.getprojectName(this.projectId);
  }

  getprojectName(id){
    this.mainService.getProjectModules(id).subscribe((data) => {
      console.log(data);
      this.projectname=data.items[0]['projectName'];
      console.log(this.projectname);
    });
  }


  getdashboard()
  {
    this.dashboardService.getAllDash().subscribe((data) =>{
      this.data = data;
      this.rows = this.data;
      console.log(data);
      this.error="No data Available";
      console.log(this.error);
    });
  }

  openModal()
  {
    this.addModall = true;
  }
  gotoadd()
  {
      this.router.navigate(['../../dashboardbuilder'],{relativeTo:this.route});
  }
  goToEdit(id:number)
  {
     this.router.navigate(['../dashrunner/'+id],{relativeTo:this.route});
  }

  goToEditData(id: number){
    this.router.navigate(['../editdata/'+id],{relativeTo:this.route});
  }

  onExport() {
    this.excel.exportAsExcelFile(this.rows, 'user_',
      moment().format('YYYYMMDD_HHmmss'))
  }

  gotoAction(){
    this.router.navigate(["../../actions"], { relativeTo: this.route, queryParams: { m_id: this.moduleId,pname:this.projectname } });
  }
  gotoRepo(){
    this.router.navigate(["../../modulecard"], { relativeTo: this.route, queryParams: { p_id: this.projectId } });
  }

  onDelete(row){
    this.rowSelected = row;
    console.log(this.rowSelected);
    this.modalDelete = true;
  }
  delete(id)
  {
     this.modalDelete = false;
     console.log("in delete  "+id);
     this.dashboardService.deleteField(id).subscribe((data)=>{
      console.log(data);
      this.ngOnInit();
     });
     if (id) {
      this.toastr.success('Deleted successfully');
          }
  }
  // openModal()
  // {
  //   this.addModall = true;
  // }
  // gotoadd()
  // {
  //     this.router.navigate(['../adddata'],{relativeTo:this.route});
  // }
  // goToEdit()
  // {
  //    this.router.navigate(['../editdashn'],{relativeTo:this.route});
  // }

}

