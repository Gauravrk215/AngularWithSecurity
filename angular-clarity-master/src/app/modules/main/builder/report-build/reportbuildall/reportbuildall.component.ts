import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportBuilderService } from 'src/app/services/api/report-builder.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reportbuildall',
  templateUrl: './reportbuildall.component.html',
  styleUrls: ['./reportbuildall.component.scss']
})
export class ReportbuildallComponent implements OnInit {
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

      const filteredData = data.filter(item => item.isSql === true);
      this.gridData = filteredData;
      if(this.gridData.length == 0){
        this.error="No data Available";
        console.log(this.error);
      }
    });
  }

  gotorunner()
  {
      this.router.navigate(['../../rerunner'],{relativeTo:this.route});
  }


  goToAdd() {
    this.router.navigate(["../add"], { relativeTo: this.route, });
  }

  goToEdit(id: number) {
    this.router.navigate(["../edit/" + id], { relativeTo: this.route });
  }
  enid;
  modelData:any[]=[];
  goToLines(val) {
    console.log(val);
this.enid=val.id;
// this.modelData = val.Rpt_builder2_lines[0].model;
   
    if(val.Rpt_builder2_lines[0].model !== '' ){
      this.router.navigate(["../edit/" + this.enid], { relativeTo: this.route });
    }
    else{
      this.router.navigate(["../reportQuery/" + this.enid], { relativeTo: this.route, });
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

}