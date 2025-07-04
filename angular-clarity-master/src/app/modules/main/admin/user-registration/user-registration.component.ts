
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";


import { UserRegistrationService } from "src/app/services/admin/user-registration.service";


export interface EmailRequest {
  email: string;
}
@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {

  model: any = {};
  EmailRequest: EmailRequest;
  emailErrMsg: string = ""
  emailCheckForm: FormGroup;
  constructor(private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userRegistrationService: UserRegistrationService) { }

  ngOnInit(): void {
    this.userRegistrationService.removeSignedUpUserInfo();
    this.userRegistrationService.removeStoredEmail();
    this.emailCheckForm = this._fb.group({
      email: ['', Validators.email]
  });
  }
  emailExistCheck() {
    console.log('input email: ', this.model.email);
    this.userRegistrationService.emailCheck(this.model.email)
      .subscribe((res) => {
        console.log('email check Res : ', res);
     /*  if(res == 202) {
          this.emailErrMsg = res.body;
          // redirect to next page
          //this.router.navigate([""])
        } else if(res.status == 409){
          this.emailErrMsg = res.body;
        } */
      }, (err) => {
        console.log(err);
      });
  }


  get f() { return this.emailCheckForm.controls; }
  onSubmit() {
    console.log('this.emailCheckForm.value : ', this.emailCheckForm.value);
    /* let headers = new HttpHeaders().set("Content-Type", "application/json");
    this.httpService.post('http://localhost:9119/token/email-exists',
      JSON.stringify(this.emailCheckForm.value), { headers: headers, responseType: 'text' })
      .subscribe(data => {
        console.log('success ', data);
        this.router.navigate(["/varify-account"]);
      }, err => {
        console.log('failure ', err);
        //location.reload;
        this.emailErrMsg = "Email is Already Exist";
      }
      ); */
    this.userRegistrationService.emailCheck(this.emailCheckForm.value)
      .subscribe((res) => {
        console.log('success ', res);
        let email: string = res.message;
        email = email.substring(16);
        console.log(email);
        this.userRegistrationService.storeEmail(email);
        this.router.navigate(["/varify-account"]);
        },(err: HttpErrorResponse) => {
          console.log(err);
          console.log(err.error.message);
          if(err.status === 409) {
            this.emailErrMsg = 'Email Already Exists';
          } else {
            this.emailErrMsg = 'Server error';
          }
      });
  }

  onSignUp() {
    this.router.navigate(["signup"]);
  }

}
