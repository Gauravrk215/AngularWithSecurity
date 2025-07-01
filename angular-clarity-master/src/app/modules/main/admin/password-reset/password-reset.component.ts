import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRegistrationService } from 'src/app/services/admin/user-registration.service';
import { UserInfoService } from 'src/app/services/user-info.service';

export interface ResetPasswordRequest {
  oldPassword: string;
  newPassword: string;
}
@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  emailErrMsg: string = ""
  oldpHide: boolean = true;
  oldIcon: string = "eye";
  oldShapeChanger() {
    this.oldpHide = !this.oldpHide;
    if(this.oldpHide){
      this.oldIcon = 'eye'
    } else {
      this.oldIcon = 'eye-hide'
    }
  }
  newpHide: boolean = true;
  newIcon: string = "eye";
  newShapeChanger() {
    this.newpHide = !this.newpHide;
    if(this.newpHide){
      this.newIcon = 'eye'
    } else {
      this.newIcon = 'eye-hide'
    }
  }
  cpHide: boolean = true;
  conIcon: string = "eye";
  comfShapeChanger() {
    this.cpHide = !this.cpHide;
    if(this.cpHide){
      this.conIcon = 'eye'
    } else {
      this.conIcon = 'eye-hide'
    }
  }

  constructor( private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userRegistrationService: UserRegistrationService,
    private userInfoService: UserInfoService) { }

    email: string;
    resetPasswordForm: FormGroup;
userid;
  ngOnInit(): void {
    this.email = this.userInfoService.getEmail();
    this.userid=this.userInfoService.getUserId();
    console.log(this.userid);

    this.resetPasswordForm = this._fb.group({
      userId:this.userid,
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(3)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: ConfirmedValidator('newPassword', 'confirmPassword')
    });
  }
  get f() { return this.resetPasswordForm.controls; }

  submitted = false;
  onSubmit() {
    console.log('this.resetPasswordForm.value : ', this.resetPasswordForm.value);
    this.submitted = true;
    if(this.resetPasswordForm.invalid){
      return;
    }
    this.resetPassword();
  }

  resetPassword() {
    this.userRegistrationService.resetPassword(this.resetPasswordForm.value)
      .subscribe((res) => {
        console.log('success ', res);
        this.router.navigate(["../user-account"], { relativeTo: this.route });
        },(err) => {
          console.log('failure ', err);
      });
  }
}

export function ConfirmedValidator(controlName: string, matchingControlName: string){
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
          return;
      }
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ confirmedValidator: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}
