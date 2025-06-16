import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/api/login.service';
import { ActivatedRoute} from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import{environment} from 'src/environments/environment';
// import { ExtendedLoginEnvironment, LoginEnvironment } from './login_environment';
//import { UserRegistrationService } from 'src/app/services/api/user-registration.service';
import { LoginEnvironment } from './login_environment';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginEnvironment = LoginEnvironment;
  showLogin2 = true;
 

  // loginEnvironment: LoginEnvironment = {
  //   companyName: 'io8.dev',
  //   imagePath: '../../../../assets/images/new.png',
  //   fpass: 'forgot password',
  //   isSignup: true,
  //   // template:'',
  // };


  // loginEnvironment: ExtendedLoginEnvironment = {
  //   companyName:  'io8.dev',
  //   imagePath: '../../../../assets/images/new.png',
  //   fpass: 'Forgot Password?',
  //   isSignup: true  // or false based on your requirement
  // };
  

  email = '';
  password = '';
  isError = false;

  model: any = {};
  errMsg: string = '';
  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private loginService: LoginService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.loginService.logout(false);

    this.loginEnvironment["imagePath"] = !this.loginEnvironment.loginImageURL ? "../../../../assets/images/new.png" : this.loginEnvironment.loginImageURL;

    console.log('Login Environment:', this.loginEnvironment);
  }

  getWrapperClass(): string {
    if (this.loginEnvironment.templateNo === 'Template 1') {
      return 'login-wrapper tamplate1';

    } else if (this.loginEnvironment.templateNo === 'Template 2') {
      return 'login-wrapper tamplate2';
    } else if (this.loginEnvironment.templateNo === '<templateNo>') {
      return 'login-wrapper tamplate1'; // Default class or empty string if no match
    }
  }

  onLogin() {
    // tslint:disable-next-line:max-line-length
    this.loginService.getToken(this.model.email, this.model.password)
      .subscribe(resp => {
        if (resp.user === undefined || resp.user.token === undefined || resp.user.token === "INVALID") {
          this.errMsg = 'Checking Email or password';
          return;
        }
        this.router.navigate([resp.landingPage]);// add , {skipLocationChange: true}
      },
        (errResponse: HttpErrorResponse) => {
          switch (errResponse.status) {
            case 401:
              this.errMsg = 'Email or password is incorrect';
              break;
            case 404:
              this.errMsg = 'Service not found';
            case 408:
              this.errMsg = 'Request Timedout';
            case 500:
              this.errMsg = 'Internal Server Error';
            default:
              this.errMsg = 'Server Error';
          }
        }
      );

  }
  goaccount(){
  }
  goforgotpass(){
    this.router.navigate(["../forgotpass"], { relativeTo: this.route });
  }


}
