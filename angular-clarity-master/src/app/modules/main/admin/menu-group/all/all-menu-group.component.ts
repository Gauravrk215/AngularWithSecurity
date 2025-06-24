import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MenuGroupService } from '../../../../../services/admin/menu-group.service';
import { MenuRegisterService } from '../../../../../services/admin/menu-register.service';

import { ToastrService } from 'ngx-toastr';
import { university } from '../../../../../models/fnd/university';
import { AlertService } from '../../../../../services/alert.service';
import { UniversityService } from 'src/app/services/admin/university.service';
import { ExcelService } from '../../../../../services/excel.service';
import * as moment from 'moment';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-all-menu-group',
    templateUrl: './all-menu-group.component.html',
    styleUrls: ['./all-menu-group.component.scss'],
})
export class AllMenuGroupComponent implements OnInit {

    rowSelected: any = {};
    modaldelete = false;
    modalEdit = false;
    modalAdd = false;
    public entryForm: FormGroup;

    loading = false;
    university;
    modalOpenedforNewLine = false;
    newLine: university = new university();

    hname = ['ashwini', 'akash', 'satyam', 'ganesh', 'krishna'];

    email = ['a@gmail.com', 'b@gmail.com', 'c@gmail.com', 'd@gmail.com', 'k@gmail.com'];

    subject = ['marathi', 'hindi', 'english'];

    booktype = ['maths', 'language', 'science'];

    bookname: string[] = ['rich dad poor dad', 'The one thing', 'The momb who head farai', 'trump', 'lucky', 'syamchi aai',
        'aai', 'ek hota karwar', 'chawa', 'mutunjay', 'duniyadari', 'dad',
        'story book', 'horror story', 'poem'];

    writer = ['true', 'false'];


    price = ['100', '200'];

    basic: boolean = false;

    id: number;
    submitted = false;
    currentUrl = "";
    selected: any[] = [];

    constructor(
        private _mg: MenuGroupService,
        private _mr: MenuRegisterService,
        private mainService: UniversityService,
        private alertService: AlertService,
        private toastr: ToastrService,
        private excel: ExcelService,
        private _fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
    ) {

    }

    ngOnInit() {

        this.getData();

    }
    getData() {
        this._mg.getAll().subscribe((data) => {
            console.log(data);
            this.university = data;
            this.university = this.university.items;
            console.log(this.university);

        });

        this.entryForm = this._fb.group({
            menu_name: [null],
            description: [null],
            active: [null],
            start_date_1: [null],
            end_date_1: [null],
            start_date: [null],
            end_date: [null],


            menu_group_lines: this._fb.array([this.initLinesForm()]),



        });

    }

    initLinesForm() {
        return this._fb.group({

            menu_id: 23,
            menu_name: [null],
            name: [null],
            active: [null],
            seq: 32,
            type: [null],

        });
    }

    onEdit(row) {
        this.rowSelected = row;
        console.log(this.rowSelected);

        this.modalEdit = true;
    }

    onDelete(row) {
        this.rowSelected = row;
        this.modaldelete = true;
    }

    delete(id) {
        this.modaldelete = false;
        console.log("in delete  " + id);
        // this.mainService.delete(id).subscribe(
        //     (data) => {
        //         console.log(data);

        //         this.ngOnInit();

        //     },
        // );

        this._mg.deleteById(id).subscribe(
            (data: any)=>{
                console.log('Deletion success...');
                this.ngOnInit();
            }
        );
        if (id) {
            this.toastr.success('Deleted successfully');
        }

    }

    onUpdate(id) {
        this.modalEdit = false;
        //console.log("in update");
        console.log("id  " + id);
        console.log(this.rowSelected);
        //console.log("out update");
        // this.mainService.update(id, this.rowSelected).subscribe(
        //     (data) => {
        //         console.log(data);

        //     },

        // );
        this._mg.updateGroupHeader(id, this.rowSelected).subscribe(
            (data: any)=>{
                console.log(data);
                console.log('Update Success...');
                this.modalEdit = false;
                this.ngOnInit();

            },
            (error: any)=>{
                console.log(error);

            }
        );
        if (id) {
            this.toastr.success('Updated successfully');
        }

    }
    onExport() {
        this.excel.exportAsExcelFile(this.university, 'user_',
            moment().format('YYYYMMDD_HHmmss'))
    }
    goToAdd(row) {

        this.modalAdd = true;

    }
    onSubmit() {



        //console.warn("calling submit");

        //console.log(this.entryForm.value);
        this.submitted = true;
        if (this.entryForm.invalid) {
            return;
        }
        this.onCreate();
    }



    onCreate() {
        this.modalAdd = false;

        this._mg.addToDb(this.entryForm.value).subscribe(
            (data: any)=>{
                console.log(data);
                this.ngOnInit();
            },
            (error: any)=>{
                console.log(error);

            }
        );
        if (this.entryForm.value) {
            this.toastr.success('Added successfully');

        }
    }

    get controls() {
        return (this.entryForm.get("menu_group_lines") as FormArray).controls;
    }

    onRemoveLines(index: number) {
        (<FormArray>this.entryForm.get("menu_group_lines")).removeAt(index);
    }
    onAddLines() {
        (<FormArray>this.entryForm.get("menu_group_lines")).push(this.initLinesForm());
    }
    update() {
        this.mainService.update(this.id, this.university).subscribe(
            (data) => {
                console.log(data);

            },
            (error: HttpErrorResponse) => {
                console.log(error.message);
            }
        );
    }

}






// import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
// import { MenuGroupService } from 'src/app/services/api/menu-group.service';
// import { MenuRegisterService } from 'src/app/services/api/menu-register.service';


// @Component({
//     selector: 'app-all-menu-group',
//     templateUrl: './all-menu-group.component.html',
//     styleUrls: ['./all-menu-group.component.scss'],
//     encapsulation: ViewEncapsulation.Emulated
// })
// export class AllMenuGroupComponent implements OnInit {
//     @ViewChild('getById') selectById: TemplateRef<any>;
//     @ViewChild('txId') txId: TemplateRef<any>;
//     basic: boolean = false;
//     columns: any[];
//     rows: any[];
//     temp = [];

//     filterData: string;
//     isLoading: boolean = false;

//     modalEdit: false;
//     loading = false;
//     openEdit = false;
//     openAdd = false;
//     openAddLine = false;
//     openEditHeader = false;

//     mgdata: any;
//     linesData: Array<any>;
//     lines = [];

//     updata = {
//         id: '',
//         active: '',
//         createdAt: '',
//         createdBy: '',
//         description: '',
//         end_date: '',
//         end_date_1: '',
//         menu_name: '',
//         start_date: '',
//         start_date_1: '',
//         updatedAt: '',
//         updatedBy: '',
//         menu_group_lines: [
//             {
//                 id: '',
//                 active: '',
//                 createdAt: '',
//                 createdBy: '',
//                 menu_id: '',
//                 manu_name: '',
//                 name: '',
//                 seq: '',
//                 type: '',
//                 updatedAt: '',
//                 updatedBy: ''
//             },
//         ],
//     }

//     updateHeader = {
//         id: '',
//         active: '',
//         createdAt: '',
//         createdBy: '',
//         description: '',
//         end_date: '',
//         end_date_1: '',
//         menu_name: '',
//         start_date: '',
//         start_date_1: '',
//         updatedAt: '',
//         updatedBy: '',
//     }

//     menu_group_line =
//             {
//                 id: '',
//                 menu_id: '',
//                 menu_name: '',
//                 name: '',
//                 active: '',
//                 seq: '',
//                 type: '',
//                 menu_group_header: {
//                     id: ''
//                 }
//             }

//     headerAdd = {
//         menu_name: '',
//         description: '',
//         active: false,
//         start_date_1: '',
//         end_date_1: ''
//     }

//     lineAdd = {
//         name: '',
//         menu_name: '',
//         active: false,
//         type: '',
//         menu_group_header: {
//             id: ''
//         }
//     }

//     constructor(
//         private _mg: MenuGroupService,
//         private _mr: MenuRegisterService
//     ) {
//         this.linesData = new Array<any>();
//      }

//     ngOnInit() {

//         this._mg.getAll().subscribe(
//             (data: any) => {
//                 this.mgdata = data;
//                 console.log(this.mgdata);

//             }
//         );

//     }

//     addData() {
//         console.log(this.headerAdd);
//         this._mg.addToDb(this.headerAdd).subscribe(
//             (data: any) => {
//                 console.log('Data addedd successfully...');
//                 this.openAdd = false;
//                 this.ngOnInit();
//             },
//             (error: any) => {
//                 console.log(error);

//             }

//         );
//     }

//     openAddLinef(id: any) {
//         this.openAddLine = true;
//         console.log(id);
//         this.lineAdd.menu_group_header.id = id;


//     }
//     saveD() {
//         console.log(this.lineAdd);
//         this._mg.addLineToDb(this.lineAdd).subscribe(
//             (data: any) => {
//                 console.log('data added success...');
//                 this.openAddLine = false;
//                 this.ngOnInit();
//             },
//             (error: any) => {
//                 console.log(error);

//             }
//         );
//     }

//     openEditGroup(id: any) {
//         this.openEdit = true;
//         console.log(id);
//         this._mg.getOneById(id).subscribe(
//             (data: any) => {
//                 this.updata = data;
//                 this.lines = this.updata.menu_group_lines;
//                 for(let val of this.updata.menu_group_lines){
//                     this.linesData.push(val);
//                 }
//                 console.log('New Data of Lines : ');
//                 console.log(this.lines);
//             },
//             (error: any) => {
//                 console.log(error);

//             }
//         );

//     }

//     perfUpdate(){
//         console.log(this.updata);
//         this.updateHeader.id = this.updata.id;
//         this.updateHeader.active = this.updata.active;
//         this.updateHeader.createdAt = this.updata.createdAt;
//         this.updateHeader.createdBy = this.updata.createdBy;
//         this.updateHeader.description = this.updata.description;
//         this.updateHeader.end_date = this.updata.end_date;
//         this.updateHeader.end_date_1 = this.updata.end_date_1;
//         this.updateHeader.menu_name = this.updata.menu_name;
//         this.updateHeader.start_date = this.updata.start_date;
//         this.updateHeader.start_date_1 = this.updata.start_date_1;
//         this.updateHeader.updatedAt = this.updata.updatedAt;
//         this.updateHeader.updatedBy = this.updata.updatedBy;

//         this._mg.updateGroupHeader(this.updateHeader.id, this.updateHeader).subscribe(
//             (datah: any)=>{
//                 console.log('Data(header) updated successsfully...');
//                 console.log(datah);

//                 for(let val of this.lines){
//                     this.menu_group_line.id = val.id;
//                     this.menu_group_line.menu_id = val.menu_id;
//                     this.menu_group_line.menu_name = val.menu_name;
//                     this.menu_group_line.name = val.name;
//                     this.menu_group_line.seq = val.seq;
//                     this.menu_group_line.type = val.type;
//                     // this.menu_group_line.menu_group_header.id = datah.id;
//                     this.menu_group_line.menu_group_header.id = this.updateHeader.id;

//                     this._mg.updateLineById(this.menu_group_line).subscribe(
//                         (data: any)=>{
//                             console.log('Data(Line) Updated Successfully...');
//                             console.log(data);
//                             this.linesData = [];
//                             this.openEdit = false;
//                             this.ngOnInit();
//                             console.log(this.linesData);

//                         },
//                         (error: any)=>{
//                             console.log(error);

//                         }
//                     );
//                 }
//             },
//             (error: any)=>{
//                 console.log(error);

//             }
//         );
//     }

//     closeM(){
//         this.openEdit = false;
//         this.linesData = [];
//     }



// }

