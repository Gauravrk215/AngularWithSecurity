import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {ForgotpassService} from '../../../services/api/forgotpass.service';
@Component({
  selector: 'app-forgotresetpassword',
  templateUrl: './forgotresetpassword.component.html',
  styleUrls: ['./forgotresetpassword.component.scss']
})
export class ForgotresetpasswordComponent implements OnInit {
  emailErrMsg: string = ""
  oldpHide: boolean = true;
  oldIcon: string = "eye";
  passchange;

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
  email: string;
    resetPasswordForm: FormGroup;
    token;
  constructor( private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private forgotpassservice:ForgotpassService) { }

  ngOnInit(): void {
    this.email = this.forgotpassservice.getStoredEmail();
    console.log(this.email)
    //token
    this.token = this.route.snapshot.params["id"];
    console.log("token is ", this.token);
    this.resetPasswordForm = this._fb.group({
      email:this.email,
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
    this.forgotpassservice.resetpass(this.resetPasswordForm.value,this.token)
      .subscribe((res) => {
       this.passchange=res;
        console.log('success ', res);
                },(err) => {
          console.log('failure ', err);
      });
      this.resetPasswordForm.reset();
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
