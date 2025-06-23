import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ExcelService } from '../../../../services/excel.service';
import * as moment from 'moment';
@Component({
  selector: 'app-documentreference',
  templateUrl: './documentreference.component.html',
  styleUrls: ['./documentreference.component.scss']
})
export class DocumentreferenceComponent implements OnInit {
  loading = false;
  public entryForm: FormGroup;
  givendata;
  orders;
  modalAdd= false;
  modaledit=false;
  rowSelected :any= {};
  constructor(private excel: ExcelService,) { }

  ngOnInit(): void {
  }
  onExport() {
    this.excel.exportAsExcelFile(this.givendata, 'user_',
      moment().format('YYYYMMDD_HHmmss'))
  }
  goToAdd() {
    this.modalAdd=true;
    //this.router.navigate(["../usermaintanceadd"],{relativeTo:this.route});
    }
}
