import { HttpErrorResponse, HttpHeaderResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReportBuilderService } from 'src/app/services/api/report-builder.service';
@Component({
  selector: 'app-report-build2add',
  templateUrl: './report-build2add.component.html',
  styleUrls: ['./report-build2add.component.scss']
})
export class ReportBuild2addComponent implements OnInit {
  public entryForm: FormGroup;
  constructor(private _fb: FormBuilder, private router: Router,private toastr: ToastrService,
    private route: ActivatedRoute,private reportBuilderService: ReportBuilderService) { }

  ngOnInit(): void {
    this.entryForm = this._fb.group({
      reportName: [null],
      description:[null],
      active:[null],
      isSql:[false],
      Rpt_builder2_lines: this._fb.array([this.initLinesFormReport()]),
    });
  
  }

  initLinesFormReport() {
    return this._fb.group({
      model: ''
    });
  }
  stdparams;
  keysfromurl;
  getkeys(){
    if(this.entryForm.value.url !== null){
      this.reportBuilderService.getcolumnDetailsByurl(this.entryForm.value.url).subscribe(data =>{
        console.log(data);
        this.keysfromurl = data;
      })
    }else{
      this.toastr.error("URL is required");
    }
  }
  

  toastrShown: boolean = false;
  onSubmit(){
    console.log(this.entryForm.value);
    this.reportBuilderService.saverbData(this.entryForm.value).subscribe((data)=>{
      console.log(data);
      if (data || data.status >= 200 && data.status <= 209) {
        this.toastr.success('Report save successfully');
     }
      },(error:HttpErrorResponse) => {
      console.log(error);
      if(error.status==404){
       this.toastr.error(error.error);
     }
     if(error.status==200){  this.toastr.success('Report save successfully'); }
     if(error.status==400){ this.toastr.error('Report Save Unsuccessful'); }
    });
    setTimeout(()=>{
    this.router.navigate(["../all"], { relativeTo: this.route });
  },500);
  }
  goback(){
    this.router.navigate(["../all"], { relativeTo: this.route });
  }

}
