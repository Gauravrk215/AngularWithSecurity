import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { NgxCaptchaModule } from 'ngx-captcha';

import { LoginRoutingModule } from './login-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ForgotresetpasswordComponent } from './forgotresetpassword/forgotresetpassword.component';
import { Forgotresetpassword1Component } from './forgotresetpassword1/forgotresetpassword1.component';
import { AddguestComponent } from './addguest/addguest.component';

import { EmailverificationComponent } from './emailverification/emailverification.component';
import { AboutWorkComponent } from './about-work/about-work.component';
import { SanitizePipe } from 'src/app/pipes/sanitize.pipe';

@NgModule({
  declarations: [LoginPageComponent, ForgotpasswordComponent, ForgotresetpasswordComponent, Forgotresetpassword1Component, AddguestComponent,
    EmailverificationComponent, AboutWorkComponent,SanitizePipe],
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    LoginRoutingModule,
  ReactiveFormsModule,
  NgxCaptchaModule,
  ]
})
export class LoginModule { }
