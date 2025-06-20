import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccesstypeService } from 'src/app/services/admin/accesstype.service';

@Component({
  selector: 'app-accesstype',
  templateUrl: './accesstype.component.html',
  styleUrls: ['./accesstype.component.scss']
})
export class AccesstypeComponent implements OnInit {
  loading = false;
  selected: any[] = [];
  rowSelected: any = {};
  modaldelete = false;
  modalAdd = false;
  modaledit = false;
  moduleAdd = false;
  error;
  data;
  module;
  moduledata;
  submitted = false;
  selected1 = "true";
  public entryForm: FormGroup;
  public mentryForm: FormGroup;
  constructor(private _fb: FormBuilder, private toastr: ToastrService,
    private router: Router, private accesstype: AccesstypeService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.entryForm = this._fb.group({

      name: ['', [Validators.required]],
      defaultvalue: ['', [Validators.required]],
      description: ['', [Validators.required]],

    });
    this.mentryForm = this._fb.group({
      modulename: [null],
    })
    this.getdata();
    this.getdata1();
  }
  getdata() {
    this.accesstype.getAll().subscribe(resp => {
      this.data = resp;
      console.log('menus: ', this.data);
      if (this.data.length == 0) {
        this.error = "No data Available";
        console.log(this.error)
      }
    }, (error) => {
      console.log(error);
      if (error) {
        this.error = "Server Error";
      }
    })
  }
  getdata1() {
    this.accesstype.getAll1().subscribe(resp => {
      this.moduledata = resp;
      console.log('menus: ', this.moduledata);
      if (this.moduledata.length == 0) {
        this.error = "No data Available";
        console.log(this.error)
      }
    }, (error) => {
      console.log(error);
      if (error) {
        this.error = "Server Error";
      }
    })
  }
  goToAdd() {
    this.modalAdd = true;
  }
  onSubmit() {
    console.log(this.entryForm.value);
    this.submitted = true;
    if (this.entryForm.invalid) {
      return;
    }
    console.log(this.entryForm.value);
    this.accesstype.create(this.entryForm.value).subscribe((data) => {
      console.log(data);
      if (data) {
        this.toastr.success('Added successfully');
      }
      this.ngOnInit();
    },
      (error) => {
        console.log('Error in adding data...', error);
        if (error) {
          this.toastr.error('Not added Data Getting Some Error');
        }
        this.ngOnInit();

      });
    this.modalAdd = false;
  }
  goToEdit(row) {
    this.rowSelected = row;
    console.log(row)
    this.modaledit = true;
    //this.router.navigate(["../edit/" + id], { relativeTo: this.route });
  }
  onDelete(row) {
    this.rowSelected = row;
    this.modaldelete = true;
  }

  delete(id) {
    this.modaldelete = false;
    console.log("in delete  " + id);
    this.accesstype.delete(id).subscribe((data) => {
      console.log(data);
      if (data) {
        this.toastr.success('Deleted successfully');
      }
      this.ngOnInit();
    },
      (error) => {
        console.log('Error in adding data...', error);
        if (error) {
          this.toastr.error('Not Deleted Data Getting Some Error');
        }
        this.ngOnInit();
      });

  }
  onUpdate(id) {
    this.modaledit = false;
    this.accesstype.update(id, this.rowSelected).subscribe((data) => {
      console.log(data);
      if (data) {
        this.toastr.success('Updated successfully');
      }
      this.ngOnInit();
    },
      (error) => {
        console.log('Error in adding data...', error);
        if (error) {
          this.toastr.error('Not updated Data Getting Some Error');
        }
        this.ngOnInit();
      });
  }
  goTomodules() {
    this.router.navigate(["../acmodules"], { relativeTo: this.route });
  }
  accessid;
  gomodules(row) {
    this.rowSelected = row;
    this.moduleAdd = true;
    this.accessid = row.id
    this.getallidmodules(this.accessid)
  }
  moduledata1;
  getallidmodules(id) {
    this.accesstype.getById(id).subscribe((data) => {
      console.log(data);
      this.moduledata1 = data;
      if (this.moduledata1.length == 0) {
        this.error = "No data Available";
        console.log(this.error)
      }
    })
  }
  addmodules(id) {
    console.log(this.mentryForm.value);
    this.accesstype.addById(id, this.mentryForm.value).subscribe((data) => {
      console.log(data);
      if (data) {
        this.toastr.success("Added Successfully");
      }
      this.ngOnInit();
    }, (error) => {
      console.log('Error in adding data...', error);
      if (error) {
        this.toastr.error('Not Added Data Getting Some Error');
      }
      this.ngOnInit();
    })
    this.moduleAdd = false;
  }
}
