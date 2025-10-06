import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MenumaintanceService } from '../../../../services/admin/menumaintance.service';
import { Rn_Main_Menu } from '../../../../models/builder/Rn_Main_Menu';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuGroupService } from 'src/app/services/admin/menu-group.service';
import { CsvService } from 'src/app/services/csv.service';
import { ExcelService } from 'src/app/services/excel.service';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from 'src/app/services/theme.service';
@Component({
  selector: 'app-menumaintance',
  templateUrl: './menumaintance.component.html',
  styleUrls: ['./menumaintance.component.scss']
})
export class MenumaintanceComponent implements OnInit {
  loading = false;
  selected: any[] = [];
  rowSelected: any = {};
  modaldelete = false;
  modalAdd = false;
  modaledit = false;
  givendata;
  menus: Rn_Main_Menu[];
  mainid = 0;
  public entryForm: FormGroup;
  mcreate;
  mdelete;
  medit;
  showdata;
  error;
  submitted = false;
  // Quick filter UI state (no API/logic changes)
  filterText = '';
  statusFilter: 'All' | 'Enable' | 'Disable' | '' = 'All';
  viewMode: 'cards' | 'table' = 'cards';
  constructor(private menuservice: MenumaintanceService,
    private toastr: ToastrService,
    private excel: ExcelService,
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private menuGroupService: MenuGroupService,
    private csvService: CsvService,
    private translate: TranslateService,
    private router: Router,
    private themeService: ThemeService) { }

  ngOnInit(): void {
    // Ensure theme variables are applied; subscription keeps this view reactive to theme changes
    this.themeService.currentTheme$.subscribe(() => {
      // Theme applied globally via CSS variables; no additional handling needed here
    });
    this.showdata = this.menuGroupService.getdata();
    console.log(this.showdata);
    this.mcreate = this.showdata.mcreate;
    console.log(this.mcreate);
    this.mdelete = this.showdata.mdelete
    console.log(this.mdelete);
    this.medit = this.showdata.medit
    console.log(this.medit);

    // this.menuservice.getAll().subscribe((data) => {
    //   console.log(data);
    //   this.givendata = data;
    // });

    this.entryForm = this._fb.group({
      // menuItemId:[null],
      menuId: [null],
      menuItemDesc: ['', [Validators.required]],
      itemSeq: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      moduleName: ['', [Validators.required]],
      status: ['', [Validators.required]],
      main_menu_action_name: ['', [Validators.required]],
      main_menu_icon_name: ['', [Validators.required]]
    });
    this.getdata();
  }

  // Stats for UI (template-safe, no inline arrow functions)
  get totalMenus(): number {
    return this.menus ? this.menus.length : 0;
  }

  get enabledMenusCount(): number {
    const list: any[] = (this.menus as unknown as any[]) || [];
    return list.filter(menu => menu && menu.status === 'Enable').length;
  }

  get disabledMenusCount(): number {
    const list: any[] = (this.menus as unknown as any[]) || [];
    return list.filter(menu => menu && menu.status === 'Disable').length;
  }

  // Filtered list for view
  get filteredMenus(): Rn_Main_Menu[] {
    const items: any[] = (this.menus as unknown as any[]) || [];
    const text = (this.filterText || '').toLowerCase();
    const status = this.statusFilter;
    return items.filter(m => {
      const matchText = !text || (
        (m.menuItemDesc || '').toLowerCase().includes(text) ||
        (m.moduleName || '').toLowerCase().includes(text) ||
        (m.main_menu_action_name || '').toLowerCase().includes(text)
      );
      const matchStatus = !status || status === 'All' || m.status === status;
      return matchText && matchStatus;
    });
  }

  setViewMode(mode: 'cards' | 'table') {
    this.viewMode = mode;
  }

  // Resolve a safe Clarity icon shape for a menu item
  getIconShape(menu: any): string {
    const raw = (menu?.main_menu_icon_name ?? menu?.mainMenuIconName ?? '').toString().trim();
    const name = raw.toLowerCase();
    const invalid = !name || name === 'undefined' || name === 'null' || name === '-' || name === 'na' || name === 'n/a';
    if (invalid) {
      return 'file'; // universal fallback icon
    }
    // Optional alias normalization
    const aliasMap: Record<string, string> = {
      'home': 'home',
      'dashboard': 'dashboard',
      'menu': 'list',
      'list': 'list',
      'link': 'link',
      'application': 'application',
      'applications': 'applications',
      'module': 'application',
      'settings': 'cog',
      'config': 'cog',
      'user': 'user',
      'users': 'users',
      'folder': 'folder',
      'file': 'file',
      'tag': 'tag',
      'bookmark': 'bookmark'
    };
    return aliasMap[name] ?? name;
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
  getdata() {
    this.menuservice.getByCurrentUserMenuGroupId1().subscribe(resp => {
      this.menus = resp;
      console.log('menus: ', this.menus);
      if (this.menus.length == 0) {
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
  onSubmit() {
    this.submitted = true;
    if (this.entryForm.invalid) {
      return;
    }
    this.menuservice.create1(this.entryForm.value).subscribe((data) => {
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
        this.getdata();
      });
    this.modalAdd = false;
  }
  goToAdd() {
    this.modalAdd = true;
  }
  submenu(id: any) {
    this.router.navigate(["../submenu/" + id], { relativeTo: this.route })
  }
  data: {};
  shrink(id: any, row) {
    this.rowSelected = row;
    console.log(this.rowSelected);
    if (this.rowSelected.subMenus != 0) {
      this.rowSelected.subMenus = []
    } console.log(this.rowSelected);
    this.menuservice.sink(id, this.rowSelected).subscribe((data) => {
      console.log(data);
    })
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
    this.menuservice.delete1(id).subscribe((data) => {
      console.log(data);
      this.toastr.success('Deleted successfully');
      this.ngOnInit();
    },
      (error) => {
        console.log('Error in adding data...', +error);
        if (error) {
          this.toastr.error('Not Deleted Data Getting Some Error');
        }
      });

  }
  onUpdate(id) {
    this.modaledit = false;
    this.menuservice.update1(id, this.rowSelected).subscribe((data) => {
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

  onExport() {
    this.excel.exportAsExcelFile(this.givendata, 'menumaintanance_',
      moment().format('YYYYMMDD_HHmmss'))
  }

  // csv

  modalCsv = false;
  selectedFiles: File;
  fileList;
  ttype = 'menumaintenance';


  // Import CSV
  public selectFile(event) {
    this.selectedFiles = event.target.files[0];
    // this.saveCsv();
  }

  csvImport() {
    console.log("import CSV");
    this.modalCsv = true;
  }
  saveCsv() {
    this.csvService.importCsv(this.selectedFiles, this.ttype).subscribe(data => {
      console.log(data);
      this.fileList = data;
      this.modalCsv = false;
    },
      (error) => {
        console.log(error);
        if (error.status == 202) {
          this.toastr.success(error.error.text)
        }
      });
  }

  downloadFiles() {
    this.csvService.downloadCsvs(this.ttype);

  }
}
