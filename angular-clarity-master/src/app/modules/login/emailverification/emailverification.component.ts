import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";


import { UserRegistrationService } from 'src/app/services/admin/user-registration.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { LoginEnvironment } from '../login-page/login_environment';

export interface EmailRequest {
  email: string;
}
@Component({
  selector: 'app-emailverification',
  templateUrl: './emailverification.component.html',
  styleUrls: ['./emailverification.component.scss']
})
export class EmailverificationComponent implements OnInit {

  loginEnvironment = LoginEnvironment;



  // baseUrl= environment.portalurl;
  submitted = false;
  conditions = {
    condition1: true,
    condition2: true,
    condition3: true,
  }

  siteKey = environment.captchaSiteKey;
  // siteKey: string = "6Le7ayYpAAAAAL76n79XlVJCg1jbXZGbnzGNJ1rt";
  constructor(private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userRegistrationService: UserRegistrationService,
    private http: HttpClient,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.generatefieldname();
    this.userRegistrationService.removeSignedUpUserInfo();
    this.userRegistrationService.removeStoredEmail();
    this.emailCheckForm = this._fb.group({
      email: [null, [Validators.email, Validators.required]],
      // recaptcha: ['', Validators.required],
      recaptcha: [null, [Validators.required, this.checkfieldname.bind(this)]],
      first_name: [null],
      last_name: [null],
      mob_no: [null],
      account_id: [null],
      usrGrpId: [null],
      new_password: [null],
      confirm_password: [null],
      accesstype: [null],
    });
  }

  model: any = {};
  EmailRequest: EmailRequest;
  emailErrMsg: string = ""

  fieldnameCode = '';
  generatefieldname(): void {
    const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const codeLength = 6; // Change to desired length

    let fieldname = '';
    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * possibleCharacters.length);
      fieldname += possibleCharacters.charAt(randomIndex);
    }
    this.fieldnameCode = fieldname;
  }

  checkfieldname(control: AbstractControl): ValidationErrors | null {
    if (control.value !== this.fieldnameCode) {
      return { fieldnameMismatch: true };
    }
    return null;
  }

  fieldnameMismatch = false;

  // checkfieldnameEdit(): void {
  //   if (this.rowSelected.recaptcha !== this.fieldnameCode) {
  //     this.fieldnameMismatch = true;
  //   } else { this.fieldnameMismatch = false; }
  // }
  emailExistCheck() {
    console.log('input email: ', this.model.email);
    this.userRegistrationService.emailCheck(this.model.email)
      .subscribe((res) => {
        console.log('email check Res : ', res);
      }, (err) => {
        console.log(err);
      });
  }

  emailCheckForm: FormGroup;

  get f() {
    return this.emailCheckForm.controls;
  }

  // onSubmit() {
  //   console.log('this.emailCheckForm.value : ', this.emailCheckForm.value);
  //   this.userRegistrationService.emailCheck(this.emailCheckForm.value)
  //     .subscribe((res) => {
  //       console.log('success: ', res);
  //       let email: string = res.message;
  //       console.log(email);
  //       this.userRegistrationService.storeEmail(email);
  //       this.router.navigate(["/selfregistration"]);
  //     }, (err: HttpErrorResponse) => {
  //       console.log(err);
  //       console.log(err.error.message);
  //       if (err.status === 409) {
  //         this.emailErrMsg = 'Email Already Exists';
  //       } else {
  //         this.emailErrMsg = 'Server error';
  //       }
  //     });
  // }
  verifyButton = false;
  handleSuccess(e) {
    console.log("ReCaptcha", e);
    console.log(this.emailCheckForm.controls);
    const data: any = this.emailCheckForm.controls;
    if (data.recaptcha.status == "VALID") {
      this.verifyButton = true;
    }
  }

  result: any;
  otpfromuser: string = '';
  otpshow = false;
  onSubmit() {
    if (this.emailCheckForm.invalid) {
      this.submitted = true;

      console.log(`invalid form..`);

      Object.keys(this.emailCheckForm.controls).forEach(field => {
        const control = this.emailCheckForm.get(field);
        if (control && control.invalid) {
          console.log(`Error in field: ${field}`, control.errors);
        }
      }
      );
      return;
    }

    let email = this.emailCheckForm.value.email;
    console.log(this.emailCheckForm.value);
    delete this.emailCheckForm.value.recaptcha
    this.userRegistrationService.sendEmail(this.emailCheckForm.value).subscribe((res) => {
      // this.userService.storeEmail(email);
      // this.router.navigate(["/verify-account"])
      console.log(res);
      this.emailErrMsg = '';

      if (res) {
        this.otpshow = true;
      }
    }, (err: HttpErrorResponse) => {
      console.log(err)
      if (err.status >= 400 && err.status <= 499) {
        this.emailErrMsg = 'Email Already Exists or Enter Correct Email';
      } else {
        this.emailErrMsg = 'Server error';
      }
    })
  }


  sendOTP(): void {
    this.userRegistrationService.sendOTP(this.emailCheckForm.value.email).subscribe(
      (response) => {
        const email = this.emailCheckForm.value.email
        console.log(`"${email}", please check and enter OTP from your email`, response);
        // this.toastr.success(`"${email}", please check and enter OTP from your email`)
        // Handle the response as needed
        this.otpfromuser = ''
        this.toastr.success(response?.msg.toString());
      },
      (error) => {
        console.error('Failed to send OTP:', error);
        // Handle errors
        if (error.status >= 400 && error.status <= 499) {
          this.toastr.error(error?.message.toString());
        } else if (error.status >= 500 && error.status <= 599) {
          this.toastr.error("server error");
        }
      }
    );
  }
  emailotpMsg: string = "";
  verifyOTP(): void {
    this.userRegistrationService.verifyOTP(this.emailCheckForm.value.email, this.otpfromuser).subscribe(
      (response) => {
        console.log('OTP verification result:', response);
        // Handle the verification result as needed
        this.toastr.success(response?.msg.toString());
        setTimeout(() => {
          this.router.navigate(["../about-work"], { relativeTo: this.route, queryParams: { email: this.emailCheckForm.value.email } });
        }, 500);
      },
      (error) => {
        console.error('OTP verification failed:', error);
        // Handle errors
        if (error.status >= 400 && error.status <= 499) {
          // this.toastr.error(error?.error?.msg.toString());
          this.emailotpMsg = error?.error?.msg;
        } else if (error.status >= 500 && error.status <= 599) {
          this.emailotpMsg = 'Server error';
        }
      }
    );
  }


  onSignUp() {
    this.router.navigate(["signup"]);
  }

  goToLogin() {
    // window.location.href = `${this.baseUrl}/#/login`;
    this.router.navigate(["login"])
  }
}
