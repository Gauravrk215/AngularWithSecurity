import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { MenumaintanceService } from '../../../../services/admin/menumaintance.service';
import { Rn_Main_Menu } from '../../../../models/builder/Rn_Main_Menu';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


function numberValidator(control: AbstractControl): { [key: string]: any } | null {
  const value = control.value;
  return isNaN(value) ? { 'notANumber': { value } } : null;
}

@Component({
  selector: 'app-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.scss']
})
export class SubmenuComponent implements OnInit {
  loading = false;
  modalAdd = false;
  modaledit = false;
  modaldelete = false;
  selected: any[] = [];
  rowSelected: any = {};
  givendata;
  menus: Rn_Main_Menu[];
  sub;
  id;
  mainid;
  submitted = false;
  public entryForm: FormGroup;
  // UI filter/view state
  filterText = '';
  statusFilter: 'All' | 'Enable' | 'Disable' | '' = 'All';
  viewMode: 'cards' | 'table' = 'cards';

  constructor(private menuservice: MenumaintanceService,
    private toastr: ToastrService,
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.currentTheme$.subscribe(() => {
      // Theme CSS variables applied globally
    });
    this.id = this.route.snapshot.params["id"];
    console.log("project mainmenu with id = ", this.id);
    this.getById(this.id);
    this.mainid = this.id
    this.entryForm = this._fb.group({
      // menuItemId:[null],
      menuId: [this.mainid],
      menuItemDesc: ['', [Validators.required]],
      //  itemSeq:['',[Validators.required]] ,
      // itemSeq: ['', [Validators.required, numberValidator]],
      itemSeq: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      moduleName: ['', [Validators.required]],
      status: ['', [Validators.required]],
      main_menu_action_name: ['', [Validators.required]]
    });

    // this.getdata();
  }

  // Derived/filtered list for view
  get filteredSubMenus(): any[] {
    const items: any[] = (this.sub as unknown as any[]) || [];
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

  setViewMode(mode: 'cards' | 'table') { this.viewMode = mode; }

  // Resolve a safe icon
  getIconShape(menu: any): string {
    const raw = (menu?.main_menu_icon_name ?? menu?.mainMenuIconName ?? '').toString().trim();
    const name = raw.toLowerCase();
    const invalid = !name || name === 'undefined' || name === 'null' || name === '-' || name === 'na' || name === 'n/a';
    if (invalid) return 'file';
    const alias: Record<string, string> = { application:'application', applications:'applications', settings:'cog', config:'cog', user:'user', users:'users', folder:'folder', file:'file', tag:'tag', bookmark:'bookmark', home:'home', dashboard:'dashboard', menu:'list', list:'list', link:'link', module:'application' };
    return alias[name] ?? name;
  }
  getById(id: any) {
    this.menuservice.getbyid(id).subscribe((data) => {
      this.sub = data;
      console.log(this.sub)
    })
  }
  getdata() {
    this.menuservice.getByCurrentUserMenuGroupId1().subscribe(resp => {
      this.menus = resp;
      console.log('menus: ', this.menus);
    })
  }
  goToAdd() {
    this.modalAdd = true;
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
        this.ngOnInit();
      }
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
    this.menuservice.delete1(id).subscribe((data) => {
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
    this.menuservice.update1(id, this.rowSelected).subscribe((data) => {
      console.log(data);
      if (data) {
        this.toastr.success('Updated successfully');
        this.ngOnInit();

      }
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
