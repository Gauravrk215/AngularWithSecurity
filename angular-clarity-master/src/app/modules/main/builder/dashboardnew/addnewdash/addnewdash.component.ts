import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from 'src/app/services/builder/dashboard.service';

@Component({
  selector: 'app-addnewdash',
  templateUrl: './addnewdash.component.html',
  styleUrls: ['./addnewdash.component.scss']
})
export class AddnewdashComponent implements OnInit {
  public entryForm: FormGroup;
  addToDashboard: boolean = false;
  submitted = false;
  moduleId:any;
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
  jsonString:any;

  fieldModels=
    {

      "dashboard": [
             {
            "cols": 4,
            "rows": 5,
            "x": 0,
            "y": 0,
            "name": "Radar Chart",
            "component": "Radar Chart"

            }
          ]
  }

  wfline = {
    model: 'this.fieldModels'
  }
  dashboard: any;
  constructor( private _fb:FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dashboardService : DashboardService,
    private toastr : ToastrService,

    ) { }

  ngOnInit(): void {
    // this.moduleId = this.wireframeService.getModuleId();
    console.log(this.moduleId);

      this.entryForm = this._fb.group({
        dashboard_name : [null],
        description: [null],
        secuirity_profile : [null],
        module_id:[null],
        tech_Stack:[null],
        object_type:[null],
        sub_object_type:[null],
        testing:[null],
        build:[null],
        add_to_home:[true],

        dashbord1_Line: this._fb.array([this.initLinesForm()]),
      // dashbord1_Line: this.fieldModels
      });


  }
  initLinesForm() {
    return this._fb.group({

      model:JSON.stringify(this.fieldModels)
    });
  }

  onSubmit() {
    console.log("In onSubmit method");
    console.log(this.entryForm.value);
    if(this.entryForm.invalid)
    {
      return;
    }
    this.onCreate()

  }
  onBack(){
    this.router.navigate(["../all"],{relativeTo:this.route});
  }

  onCreate()
  {
    console.log("in oncreate method");
    this.entryForm.value.module_id=this.moduleId;

    console.log(typeof this.fieldModels)

    this.dashboardService.create(this.entryForm.value).subscribe((data)=>{
      console.log(data);
      this.router.navigate(["../all"],{relativeTo:this.route});
    },
    (error) => {
      console.log(error);
    }
    );
    if(this.entryForm.value)
    {
      this.toastr.success('Added successfully');
    }
  }


}
