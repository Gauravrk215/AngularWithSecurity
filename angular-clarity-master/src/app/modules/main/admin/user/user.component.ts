import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../../services/alert.service';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from './../../../../services/excel.service';
import { MainService } from './../../../../services/main.service';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { UserListService } from '../../../../services/admin/user-list.service';
import { HttpClient } from '@angular/common/http';
import { MenuGroupService } from '../../../../services/admin/menu-group.service';
import { UserInfoService } from '../../../../services/user-info.service';
import { User } from '../../../../models/admin/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: any[] = [];
  rowSelected: any = {};
  loading = false;
  modalEdit = false;
  allusers: any;
  // allusers: user;
  userst: User;
  openAddUser = false;
  modaldelete = false;
  modalcreate = false;
  modalup = false;
  tempid: any;
  assign = false;

  user = {
    id: '',
    user_id: '',
    name: '',
    gender: '',
    dob: '',
    email: '',
    username: '',
    password: ''
  }
  updateU = {
    id: '',
    user_id: '',
    name: '',
    gender: '',
    dob: '',
    email: '',
    username: '',
    password: ''
  }

  updateU1 = {
    userId: '',
    email: '',
    firstName: '',
    lastName: '',
    username: '',
    password: ''
  }

  // image related variables
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  // imageName: any;
  imageName = 'index.jpg';

  groupData: any;

  userData = {
    id: '',
    user_id: '',
    name: '',
    gender: '',
    dob: '',
    email: '',
    username: '',
    password: '',
    menu_group: ''
  }

  constructor(
    private _mg: MenuGroupService,
    private mainService: MainService,
    private alertService: AlertService,
    private toastr: ToastrService,
    private excel: ExcelService,
    private router: Router,
    private route: ActivatedRoute,
    private _user: UserListService,
    private httpClient: HttpClient,
    private _ut: UserInfoService
  ) { }

  ngOnInit() {
    this.getUsersT();
    this.getUser();
    this.getUsers();

    // this.getImage();

    this._mg.getAll().subscribe(
      (data: any) => {
        this.groupData = data.items;
        // console.log(this.groupData);
      }
    );
  }

  openAssignModal(id: any) {
    // console.log(id);
    this._user.getOne(id).subscribe(
      (data: any) => {
        this.userData = data;
      }
    );
    this.assign = true;
  }

  saveAssign() {
    // console.log(this.userData.menu_group);
    this._user.update(this.userData).subscribe(
      (data: any) => {
        console.log('Assign Updated Successfully...');
        this.assign = false;
        this.ngOnInit();
      }
    );
  }

  async getUser() {
    this.loading = true;
    const result = await this.mainService.getUserTest();
    if (result.results) {
      this.users = result.results;
    }
    this.loading = false;
  }

  onEdit(row) {

    console.log(row);
    this._user.getOne(row).subscribe(
      (data: any) => {
        this.updateU = data;
        console.log(this.updateU);

      }
    );
    this.modalEdit = true;
  }

  del(id: any) {
    this.tempid = id;
    this.modaldelete = true;
  }

  async onDelete() {
    // const confirmed: any = await this.alertService.confirm('', 'Delete confirm?');
    // if (confirmed.value) {
    //   this.toastr.success('Deleted successfully');
    //   // ....
    // }

    this._user.deleteById(this.tempid).subscribe(
      (data: any) => {
        console.log('Success....');
        this.toastr.success('User deleted successfully...');
        this.modaldelete = false;
        this.ngOnInit();

      }
    );
  }

  async onSave() {
    const confirmed: any = await this.alertService.confirm('', 'Save confirm?');
    if (confirmed.value) {
      this.toastr.success('Save successfully');
      // ....
      this.modalEdit = false;
    }
  }

  onExport() {
    this.excel.exportAsExcelFile(this.allusers, 'user_',
      moment().format('YYYYMMDD_HHmmss'))
  }
  goToAdd() {
    this.openAddUser = true;
  }

  getUsers() {
    this._user.getAll().subscribe(
      (data: any) => {
        this.allusers = data;

        this.allusers.forEach((i: any) => {
          i['imgData'] = '';
          // this.getImage(i.id);
          // i['imgData'] = this.retrievedImage;

          this.httpClient.get('http://localhost:9191/user_list/get/' + i.id)
            .subscribe(
              res => {
                this.retrieveResonse = res;
                this.base64Data = this.retrieveResonse.picByte;
                this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
                i['imgData'] = 'data:image/jpeg;base64,' + this.base64Data;
                // console.log(this.retrievedImage);
              }
            );
        });

        console.log(this.allusers);
      },
      (error: any) => {
        console.log('Error in loading users from server...');

      }
    );
  }

  createUserHere() {
    console.log('add button clicked....');

    this._user.add(this.user).subscribe(
      (data: any) => {
        this.onUpload(data.id);
        console.log('added...');
        this.toastr.success('User added successfully...');

        this.openAddUser = false;
        this.ngOnInit();

      },
      (error: any) => {
        console.log(error);

      }
    );
  }

  updateUser() {
    console.log('button clicked: update');
    this._user.update(this.updateU).subscribe(
      (data: any) => {
        console.log('success...');
        this.toastr.success('User updated successfully...');
        this.modalEdit = false;
        this.ngOnInit();
      },
      (error: any) => {
        console.log(error);

      }
    );
  }

  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }

  //Gets called when the user clicks on submit to upload the image
  onUpload(user: any) {
    console.log(this.selectedFile);

    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    uploadImageData.append('user_id', user);

    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post('http://localhost:9191/user_list/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Document uploaded successfully';
        } else {
          this.message = 'Document not uploaded successfully';
        }
      }
      );


  }

  //Gets called when the user clicks on retieve image button to get the image from back end
  getImage(id: any) {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:9191/user_list/get/' + id)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
          // console.log(this.retrievedImage);
        }
      );
  }

  onEditNew(id: any) {
    console.log(id);
    this.getOneUser(id);
    this.modalEdit = true;
  }

  delNew(id: any) {
    this.tempid = id;
    console.log(id);

  }

  openAssignModalNew(id: any) {
    console.log(id);

  }

  getUsersT() {

    this.httpClient.get('http://localhost:9191/api/all-users').subscribe(
      (data: any) => {
        this.userst = data;
        console.log(this.userst);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getOneUser(id: any) {

    this.httpClient.get('http://localhost:9191/api/org-users/' + id).subscribe(
      (data: any) => {
        this.updateU1 = data;
        console.log(this.updateU1);

      },
      (er: any) => {
        console.log(er);

      }
    );
  }

  updateUserNew() {
    this.httpClient.put('http://localhost:9191/api/org-users/' + this.updateU1.userId, this.updateU1).subscribe(
      (data: any) => {
        console.log('success...');
        this.toastr.success('User updated successfully...');
        this.modalEdit = false;
        console.log(data);
        this.ngOnInit();

      },
      (error: any) => {
        console.log(error);

      }
    );
  }
}

