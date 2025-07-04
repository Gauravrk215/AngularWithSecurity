import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import {SysparameterService} from 'src/app/services/admin/sysparameter.service';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Systemparameter} from 'src/app/models/admin/systemparameter'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-systemparameters',
  templateUrl: './systemparameters.component.html',
  styleUrls: ['./systemparameters.component.scss'],

})
export class SystemparametersComponent implements OnInit {
  public profilePic: File = null;
  message: string;
  image: any;
  selectedFile: File[]=[];
  public entryForm: FormGroup;
  project: Systemparameter;
  id=1;
  constructor(private alertService: AlertService,
    private sysparaservice:SysparameterService,
    private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.project = new Systemparameter();
    this.getById(this.id);

    this.entryForm = this._fb.group({
      schedulerTime: [null],
      leaseTaxCode: [null],
      vesselConfProcessLimit: [null],
      rowToDisplay: [null],
      linkToDisplay: [null],
      rowToAdd: [null],
      lovRowToDisplay: [null],
      lovLinkToDisplay: [null],
      oidserverName: [null],
      oidBase: [null],
      oidAdminUser: [null],
      oidServerPort: [null],
      userDefaultGroup: [null],
      defaultDepartment: [null],
      defaultPosition: [null],
      singleCharge: [null],
      firstDayOftheWeek: [null],
      hourPerShift: [null],
      cnBillingFrequency: [null],
      billingDepartmentCode: [null],
      basePriceList: [null],
      nonContainerServiceOrder: [null],
      ediMaeSchedulerONOFF: [null],
      ediSchedulerONOFF: [null],
      upload_Logo:[null],
      Company_Display_Name:[null]
    });

  }
  public onFileChanged(event) {
        for (var i = 0; i < event.target.files.length; i++) {
      this.selectedFile.push(event.target.files[i]);
    }
  }
  // onSubmit(){
  //   this.userObj.status='P';
  //   console.log(this.entryForm.value);
  //   this.mainService.createall(this.entryForm.value,this.selectedFile).subscribe(data => {
  //     console.log(data)

  //   },
  //     (error) => {
  //       console.log(error);
  //     }

  //   );
  // }
  adddata(){
    this.sysparaservice.create(this.entryForm.value).subscribe(
      (data) => {
        console.log(data);
      // this.router.navigate(["../../project/all"], { relativeTo: this.route });
      },

    );
  }
  getById(id: number) {
    this.sysparaservice.getById(id).subscribe((data) => {
        this.project = data;
        console.log("getbyiddata",this.project);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  updatedata(){
    this.sysparaservice.update(this.id, this.project,this.selectedFile).subscribe(
      (data) => {
        console.log(data);
        //this.router.navigate(["../../../project/all"], { relativeTo: this.route });
      },

    );
    if (this.id) {
      this.toastr.success('Updated successfully');
          }
  }
}
