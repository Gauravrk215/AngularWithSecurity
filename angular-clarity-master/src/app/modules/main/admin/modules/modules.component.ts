import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccesstypeService } from 'src/app/services/admin/accesstype.service';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit {
  loading = false;
  selected: any[] = [];
  rowSelected: any = {};
  modaldelete = false;
  modalAdd = false;
  modaledit = false;
  error;
  data;
  submitted = false;
  public entryForm: FormGroup;
  constructor(private _fb: FormBuilder, private accesstype: AccesstypeService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.entryForm = this._fb.group({
      modules: ['', [Validators.required]],
      description: ['', [Validators.required]],
      access_exclusive: ['', [Validators.required]],
    });
    this.getdata();
  }
  getdata() {
    this.accesstype.getAll1().subscribe(resp => {
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
  goToAdd() {
    this.modalAdd = true;
  }
  onSubmit() {
    console.log(this.entryForm.value);
    this.submitted = true;
    if (this.entryForm.invalid) {
      return;
    }
    this.accesstype.create1(this.entryForm.value).subscribe((data) => {
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
    this.accesstype.delete1(id).subscribe((data) => {
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
    this.accesstype.update1(id, this.rowSelected).subscribe((data) => {
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
}
