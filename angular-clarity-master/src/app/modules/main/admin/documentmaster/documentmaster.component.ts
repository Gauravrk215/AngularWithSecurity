import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ExcelService } from '../../../../services/excel.service';
import * as moment from 'moment';
@Component({
  selector: 'app-documentmaster',
  templateUrl: './documentmaster.component.html',
  styleUrls: ['./documentmaster.component.scss']
})
export class DocumentmasterComponent implements OnInit {
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
