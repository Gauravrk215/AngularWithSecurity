import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MenuGroupService } from '../../../../../services/admin/menu-group.service';
import { MenuRegisterService } from '../../../../../services/admin/menu-register.service';

@Component({
  selector: 'app-all-menur',
  templateUrl: './all-menur.component.html',
  styleUrls: ['./all-menur.component.scss']
})
export class AllMenurComponent implements OnInit {

  basic: boolean = false;
  columns: any[];
  rows: any[];
  temp = [];
  selected: any[] = [];
  filterData: string;
  isLoading: boolean = false;

  modalEdit: false;
  loading = false;

  openEdit = false;
  openAdd = false;

  modaldelete = false;
  tempid: any;

  regData: any;

  addReg = {
    main_menu_name: '',
    main_menu_action_name: '',
    main_menu_icon: '',
    enable_flag: false,
    end_date_1: ''
  }

  upReg = {
    id: '',
    main_menu_name: '',
    main_menu_action_name: '',
    main_menu_icon: '',
    enable_flag: '',
    end_date_1: ''
  }

  line = {
    id: '',
    menu_id: '',
    menu_name: '',
    name: '',
    active: true,
    seq: '',
    type: '',
    menu_group_header: {
      id: 5,
    }
  };

  lenReg: any;

  constructor(
    private _mr: MenuRegisterService,
    private _mg: MenuGroupService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {

    this._mr.getd().subscribe(
      (data: any) => {
        this.regData = data.items;
        this.lenReg = this.regData.length;
        console.log(this.regData);
        console.log(this.lenReg);


      }
    );


  }

  saveData() {
    console.log(this.addReg);

    this._mr.add(this.addReg).subscribe(
      (data: any) => {
        console.log('Data Success...');

        this.line.menu_id = data.id;
        this.line.active = true;
        this.line.type = 'admin';
        // this.line.menu_group_header.id = '5';

        this._mr.getd().subscribe(
          (data: any)=>{
            this.lenReg = data.length;
          }
        );

        this.line.seq = this.lenReg + 1;

        this._mg.addLineToDb(this.line).subscribe(
          (data: any)=>{
            console.log('both success..');

          },
          (error: any)=>{
            console.log(error);

          }
        );

        this.openAdd = false;
        this.addReg = {
          main_menu_name: '',
          main_menu_action_name: '',
          main_menu_icon: '',
          enable_flag: false,
          end_date_1: ''
        };
        this.ngOnInit();
        this.toastr.success('Added successfully');
      },
      (error: any) => {
        console.log(error);

      }
    );
  }

  editReg(id: any) {
    this.openEdit = true;
    console.log(id);
    this._mr.getById(id).subscribe(
      (data: any) => {
        this.upReg = data;
        console.log(this.upReg);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  performup() {
    this._mr.update(this.upReg.id, this.upReg).subscribe(
      (data: any) => {
        console.log('updation success...');
        this.toastr.success('Updated successfully');
        this.openEdit = false;
        this.ngOnInit();

      },
      (error: any) => {
        console.log(error);

      }
    );
  }

  delete(id: any) {
    this.tempid = id;
    this.modaldelete = true;

  }

  del() {
    console.log('Id of row u clicked is : ' + this.tempid);
    this._mr.deleteById(this.tempid).subscribe(
      (data: any) => {
        console.log('Deletion successful..');
        this.ngOnInit();
        this.modaldelete = false;
        this.toastr.success('Deleted successfully');
      },
      (error: any) => {
        console.log(error);

      }
    );
  }

}
