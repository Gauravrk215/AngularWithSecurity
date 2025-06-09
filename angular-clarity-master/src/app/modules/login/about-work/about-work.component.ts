import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { UserProfileService } from 'src/app/services/admin/user-profile.service';
import { UserRegistrationService } from 'src/app/services/admin/user-registration.service';
import { environment } from 'src/environments/environment';
import { CustomerService } from './customer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-about-work',
  templateUrl: './about-work.component.html',
  styleUrls: ['./about-work.component.scss']
})



export class AboutWorkComponent implements OnInit {

  // LoginUrl = environment.portalurl;
  public entryForm: FormGroup;
  public custentryForm: FormGroup; // user
  public customerentryForm: FormGroup;
  aboutdata;
  id: number;
  checknumberId: number;
  data1: boolean;
  name:string;
  email: string;
  submitted = false;
  custsubmitted = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userRegistration: UserRegistrationService,
    private _fb: FormBuilder,
    private userprofile: UserProfileService,
    private customerservice: CustomerService,
    private toastr: ToastrService
  ) {
  }
  companyid = 1;
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      console.log(this.email)
    });
    this.id = this.route.snapshot.params['id'];
    this.checknumberId = this.route.snapshot.params['checknumberId'];
    this.name = this.userRegistration.getStoredName();
    console.log(this.id, this.checknumberId);
    this.userRegistration.removeStoredName();

    // this.data1 = this.route.snapshot.data['data1'];
    // if (this.id >= 0) {
    //   this.onCheck();

    // }
    // else {
    //   this.router.navigate(['../about-work']);
    // }


    this.onCheck();
    // this.email = this.userRegistration.getStoredEmail();

    this.custentryForm = this._fb.group({
      first_name: [null, [Validators.required]],
      last_name:[null,  [Validators.required]],
      mob_no:[null,[Validators.required,Validators.pattern('^[0-9]{10}$')]],
      email:[this.email],
      usrGrpId:[41],
      new_password: [null, [Validators.required,Validators.minLength(6),Validators.maxLength(40)]],
      confirm_password: [null, [Validators.required]],
      account_id:[this.companyid],

      date_of_birth:[null, [Validators.required]],
      gender:[null,Validators.required]

    }, {
       validator: ConfirmedValidator('new_password', 'confirm_password')
    });


    this.entryForm = this._fb.group({
      companyName:[null,  [Validators.required]],
      pancard:[null,[Validators.required]],
      workspace:[null,[Validators.required]],
      email: [this.email,[Validators.required,Validators.email]],
      gstNumber:[null,[Validators.required]],
      mobile: [this.custentryForm.value.mob_no, [Validators.pattern('^[0-9]{10}$')]],

      country:[null,[Validators.required]],
      state:[null,[Validators.required]],
      city:[null],
      street_address:[null],
      street_address2:[null],

    }, {
    });

    this.customerentryForm = this._fb.group({
      first_name: [null],
      last_name:[null],
      date_of_birth:[null],
      gender:[null],
      companyId:[null],
      time_zone:[null,],
      gst_state:[null],
      email:[null],
      entity_name:[this.companyid],

    });
  }

  companyForm:boolean = false;
  oncustSubmit(){
    console.log(this.custentryForm.value);
    // this.custentryForm.value.entity_name = this.companyid;
    if (this.custentryForm.invalid) {
      this.custsubmitted = true;
      return;
    }else{
      // this.companyForm = true;
      // this.oncustContinue();
      this.onContinue();
    }
  
  }
  selectedFile;
    oncustContinue() {
  
     
      
      console.log(this.custentryForm.value);
  
      this.customerservice.saveCustomer(this.custentryForm.value, this.selectedFile).subscribe((data => {
        console.log(data);
        console.log(data.id, "User id");
        console.log("Roles", data.role);
        console.log(data.checknumberId, "checknumber");
        this.aboutdata = data;
        if (data.role == "USER") {
          this.router.navigate(["../login/"]);
          // window.location.href = `${this.LoginUrl}/#/login`;
        } else {
          this.router.navigate(["../pricing/" + data.id]);
        }
  
      }))
    }



userId;
  
onSubmit(){
  this.entryForm.value.email = this.email
  if (this.entryForm.invalid) {
    this.submitted = true;
    return;
  }else{
    this.onContinue();
  }

}
  onContinue() {

   
    // this.entryForm.value.mobile =  this.custentryForm.value.mob_no;
    console.log(this.custentryForm.value);

    // this.userprofile.addUserinSignUP(this.entryForm.value).subscribe(data => {
    //   console.log(data);
    //   this.companyid = data.account_id;
    //   console.log(this.companyid, "company id");
    //   this.aboutdata = data;
    //   this.custentryForm.value.account_id = data?.account_id
    //   // this.custentryForm.value.new_password = 
    //   console.log(this.custentryForm.value);
      this.userprofile.adduserData(this.custentryForm.value).subscribe(cdata => {
        console.log(cdata);
        this.userId = cdata.userId;

      if (cdata) {
        this.toastr.success("Registrated Successfully");
        this.router.navigate(["../login/"]);
      } else {
        this.router.navigate(["../login/"]);
      }
      // this.customerentryForm.get('companyId').setValue(this.companyid);
      // this.customerentryForm.get('gst_state').setValue(this.entryForm.value.state);
      // this.customerentryForm.get('entity_name').setValue(this.entryForm.value.companyName);
      // this.customerentryForm.get('first_name').setValue(this.custentryForm.value.first_name);
      // this.customerentryForm.get('last_name').setValue(this.custentryForm.value.last_name);
      // this.customerentryForm.get('date_of_birth').setValue(this.custentryForm.value.date_of_birth);
      // this.customerentryForm.get('gender').setValue(this.custentryForm.value.gender);
      // this.customerentryForm.get('email').setValue(this.email);


      // this.customerservice.saveCustomer(this.customerentryForm.value, this.selectedFile).subscribe(data => {
      //   console.log(data);
      //   console.log(data.id, "User id");
      //   this.aboutdata = data;
      //   if (data.status >= 200 && data.status <= 299) {
      //     console.log(data?.body)
      //     this.router.navigate(["../pricing/" + this.companyid +"/" +this.userId]);
      //   }
      // })
    },(error)=>{
      console.log(error);
      this.toastr.error(error?.error.message);
    })
    // })
  }








  onCheck() {

    this.userprofile.getUser(this.id, this.checknumberId).subscribe((data => {
      // console.log(data.userId, "User id");
      console.log("data", data.email);
      console.log(data);
      this.data1 = data;
      this.email = data.email;
      this.name=data.fullName;
      (<FormControl>this.entryForm.controls['email']).setValue(data.email);
      (<FormControl>this.entryForm.controls['name']).setValue(data.fullName);
      console.log(this.name)

    }))


  }


  onCountryChange(event) {
    console.log(event.dialCode);
    console.log(event.name);
    console.log(event.iso2);
  }

  back() {
    this.router.navigate(["../../all"], {relativeTo: this.route});
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


  cnewpHide: boolean = true;
  cnewIcon: string = "eye";
  cnewShapeChanger() {
    this.cnewpHide = !this.cnewpHide;
    if(this.cnewpHide){
      this.cnewIcon = 'eye'
    } else {
      this.cnewIcon = 'eye-hide'
    }
  }

}
// export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
//   const password = control.get('password');
//   const confirmPassword = control.get('confirmPassword');

//   if (password.value !== confirmPassword.value) {
//     return { passwordMismatch: true };
//   }

//   return null;
// }
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
