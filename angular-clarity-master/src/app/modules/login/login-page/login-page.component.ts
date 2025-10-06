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
  isLoading = false;
  showPassword = false;

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
    console.log('onLogin called');
    console.log('Form data:', { email: this.model.email, password: this.model.password });
    
    // Reset error state
    this.isError = false;
    this.errMsg = '';
    
    // Validate inputs
    if (!this.model.email || !this.model.password) {
      this.isError = true;
      this.errMsg = 'Please enter both email and password';
      console.log('Validation failed - missing email or password');
      return;
    }

    // Set loading state
    this.isLoading = true;
    console.log('Loading state set to true, making API call...');

    // tslint:disable-next-line:max-line-length
    this.loginService.getToken(this.model.email, this.model.password)
      .subscribe(
        resp => {
          console.log('API Response received:', resp);
          // Always reset loading state when response is received
          this.isLoading = false;
          
          // Handle different response formats
          if (resp.operationStatus === 'ERROR') {
            this.isError = true;
            this.errMsg = resp.operationMessage || 'Login failed';
            return;
          }
          // Handle different response formats
          if (resp.success === 'false' || resp.success === false) {
            this.isError = true;
            this.errMsg = resp.message || 'Login failed';
            return;
          }
          if (resp.user === undefined || resp.user.token === undefined || resp.user.token === "INVALID") {
            this.isError = true;
            this.errMsg = 'Invalid email or password';
            return;
          }
          
          // Success - navigate to landing page
          console.log('Login successful, navigating to:', resp.landingPage);
          this.router.navigate([resp.landingPage]);
        },
        (errResponse: HttpErrorResponse) => {
          console.log('API Error received:', errResponse);
          // Always reset loading state when error occurs
          this.isLoading = false;
          this.isError = true;
          
          switch (errResponse.status) {
            case 401:
              this.errMsg = 'Email or password is incorrect';
              break;
            case 404:
              this.errMsg = 'Service not found';
              break;
            case 408:
              this.errMsg = 'Request timeout';
              break;
            case 500:
              this.errMsg = 'Internal server error';
              break;
            case 0:
              this.errMsg = 'Network error - please check your connection';
              break;
            default:
              this.errMsg = 'An error occurred. Please try again.';
          }
        }
      );
  }
  goaccount(){
  }
  goforgotpass(){
    this.router.navigate(["../forgotpass"], { relativeTo: this.route });
  }

  // Clear error when user starts typing
  clearError() {
    if (this.isError) {
      this.isError = false;
      this.errMsg = '';
    }
  }

  // Toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}