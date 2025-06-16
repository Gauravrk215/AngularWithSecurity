import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MyworkspaceService } from 'src/app/services/admin/myworkspace.service';

@Component({
  selector: 'app-forgotresetpassword1',
  templateUrl: './forgotresetpassword1.component.html',
  styleUrls: ['./forgotresetpassword1.component.scss']
})
export class Forgotresetpassword1Component implements OnInit {
  public  form: FormGroup;
  submitted = false;
  passchange;
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
  get f() { return this.form.controls; }
  email: string;
  token;
  constructor(private _fb: FormBuilder,
    private route: ActivatedRoute,
    private mywork:MyworkspaceService) { }

  ngOnInit(): void {
    this.email = this.mywork.getStoredEmail();
    console.log(this.email)
    this.token = this.route.snapshot.params["id"];
    console.log("token is ", this.token);
    //form validation
    this.form = this._fb.group(
      {
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        mob_no: ['', [Validators.required,Validators.minLength(10)]],
        password: ['',[ Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
        confirm_passwordS: ['', Validators.required],

      }, );
  }
  onsubmit(){
this.mywork.adduserdetails(this.form.value,this.token).subscribe((data)=>{
  console.log(data);
  this.passchange=data;
        console.log('success ', data);
                },(err) => {
          console.log('failure ', err);
})
  }
}
