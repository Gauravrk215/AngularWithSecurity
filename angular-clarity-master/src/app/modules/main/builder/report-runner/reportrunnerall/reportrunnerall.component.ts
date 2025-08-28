import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportBuilderService } from 'src/app/services/api/report-builder.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reportrunnerall',
  templateUrl: './reportrunnerall.component.html',
  styleUrls: ['./reportrunnerall.component.scss']
})
export class ReportrunnerallComponent implements OnInit {
  gridData;
  loading = false;
  error;
  selected: any[] = [];
  rowSelected :any= {};
  modaldelete=false;
  isLoading: boolean = false;
  projectId;
  moduleId;
  projectname;
  constructor(private router: Router,
    private route: ActivatedRoute,private reportBuilderService: ReportBuilderService,
    private toastr:ToastrService, ) { }

  ngOnInit(): void {
    
    this.getAll();
  }


  getAll() {
    this.isLoading = true;
    this.reportBuilderService.getrbDetails().subscribe((data) => {
      this.isLoading = false;
      console.log(data);
      this.gridData = data;
      if(this.gridData.length == 0){
        this.error="No data Available";
        console.log(this.error);
      }
    });
  }

  goToAdd2() {
    this.router.navigate(["../../reportbuild2/"], { relativeTo: this.route, });
  }

  goToAdd() {
    this.router.navigate(["../../reportbuild/"], { relativeTo: this.route, });
  }

  goToEdit(id: number) {
    this.router.navigate(["../edit/" + id], { relativeTo: this.route });
  }
  goToRunner(user) {
    const id = user.id;
    const isSql = user.isSql;
    if(isSql == true) {
      this.router.navigate(["../runner/" + id], { relativeTo: this.route, });
    }else  if(isSql == false){
      this.router.navigate(["../runner2/" + id], { relativeTo: this.route, });
    }
   
  }
  onDelete(row) {
    this.rowSelected = row;
     this.modaldelete=true;
  }
  delete(id){
    this.modaldelete = false;
    this.reportBuilderService.deletrbById(id).subscribe((data) => {
      console.log(data);
      if(data || data == null || data.status >= 200 && data.status <= 209){
        this.toastr.success("Deleted successfully");
      }
     this.ngOnInit();
    },(error) => {
      console.log(error);
      this.toastr.error("getting error in deleting data");
    })
  }

  gotoAction(){
    this.router.navigate(["../../actions"], { relativeTo: this.route, queryParams: { m_id: this.moduleId,pname:this.projectname } });
  }
  gotoRepo(){
    this.router.navigate(["../../modulecard"], { relativeTo: this.route, queryParams: { p_id: this.projectId } });
  }
}