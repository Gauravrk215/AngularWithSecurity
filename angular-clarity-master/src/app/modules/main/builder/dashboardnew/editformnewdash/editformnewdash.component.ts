import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from 'src/app/services/builder/dashboard.service';
// import { TechnologyStackService } from 'src/app/services/builder/technology-stack.service';
// import { WireframeService } from 'src/app/services/builder/wireframe.service';

@Component({
  selector: 'app-editformnewdash',
  templateUrl: './editformnewdash.component.html',
  styleUrls: ['./editformnewdash.component.scss']
})
export class EditformnewdashComponent implements OnInit {
  updated = false;
  Header;
  id: number;
  moduleId;
  tech_stacks=[];
  object_types = ["form", "bi", "report", "api"];
  sub_object_types = [
    "only header",
    "only line",
    "header line",
    "header multiline",
    "wrokflow",
    "setup",
    "std report",
    "bi report",
    "rest api",
  ];
  constructor(private router: Router,
    private route: ActivatedRoute,  private dashboardService : DashboardService,
    // private technologyStackService:TechnologyStackService,
    private toastr: ToastrService,
    //  private wireframeService :WireframeService,
     ) { }

  ngOnInit(): void {
    // this.moduleId = this.wireframeService.getModuleId();
    this.id = this.route.snapshot.params["id"];
    console.log("update with id = ", this.id);
    this.getById(this.id);
  //   this.technologyStackService.getAll().subscribe((data)=>{
  //     console.log(data)
  //   this.tech_stacks=data;
  // });
  }

  getById(id: number) {
    this.dashboardService.getById(id).subscribe(
      (data) => {
        console.log(data);
        this.Header = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  update() {
    this.dashboardService.updateDash(this.Header).subscribe(
      (data) => {
        console.log(data);
        if (data) {
          this.toastr.success('Update successfully');
       }
        this.router.navigate(["../../all"], { relativeTo: this.route });
        //this.router.navigate(["../../all"],{ relativeTo: this.route, queryParams: { p_id: this.projectId } });
      },
      (error) => {
        // console.log(error);
        // const objectArray = Object.entries(error.error.fieldErrors);
        // objectArray.forEach(([k, v]) => {
        //   console.log(k);
        //   console.log(v);
        //   this.fieldErors.push({ field: k, message: v });
        // });
        console.log(error); // this will come from backend
      }
    );
    // this.lineBuilder_Header = new Rn_Cff_ActionBuilder_Header();
  }

  onSubmit() {
    this.updated = true;
    this.update();
  }

  onBack() {
    this.router.navigate(["../../all"], { relativeTo: this.route });
  }

}
