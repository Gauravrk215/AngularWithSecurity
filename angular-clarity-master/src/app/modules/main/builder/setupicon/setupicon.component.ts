import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuGroupService } from 'src/app/services/admin/menu-group.service';
import { MenumaintanceService } from 'src/app/services/admin/menumaintance.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-setupicon',
  templateUrl: './setupicon.component.html',
  styleUrls: ['./setupicon.component.scss']
})
export class SetupiconComponent implements OnInit {

  sub;
  constructor(private router: Router, private route: ActivatedRoute, private menuservice: MenumaintanceService, private menuGroupService: MenuGroupService,
    private translate: TranslateService
  ) { }


  ngOnInit(): void {
    this.getById(1116)
  }
  switchLanguage(language: string) {
    this.translate.use(language);
  }
  getById(id: any) {
    this.menuservice.getbyid(id).subscribe((data) => {
      this.sub = data;
      console.log(this.sub)
    })
  }
  mc;
  me;
  md;
  mv;
  goToUserMaintenance(val) {
    console.log(val);
    this.menuGroupService.storeaddeditvalues(val);
    this.mc = val.mcreate;
    this.me = val.medit;
    this.md = val.mdelete;
    this.mv = val.mvisible;
    if (this.mv == 'false') {
      this.router.navigate(['/**'])
    }
    this.router.navigate(['../' + val.main_menu_action_name], { relativeTo: this.route });
  }

  goToUsergrpMaintenance() {
    this.router.navigate(['/cns-portal/usergrpmaintance'], { relativeTo: this.route });
  }

  goToMenumaintance() {
    this.router.navigate(['/cns-portal/menumaintance'], { relativeTo: this.route });
  }

  goToMenuaccess() {
    this.router.navigate(['/cns-portal/menuaccess'], { relativeTo: this.route });
  }

  goToSystemparameters() {
    this.router.navigate(['/cns-portal/systemparameters'], { relativeTo: this.route });
  }

  goToAccesstype() {
    this.router.navigate(['/cns-portal/accesstype'], { relativeTo: this.route });
  }

  goToreport() {
    this.router.navigate(['/cns-portal/reportbuild'], { relativeTo: this.route });
  }

  goTodash() {
    this.router.navigate(['/cns-portal/dashboardbuilder'], { relativeTo: this.route });
  }

  goToApiRegistery() {
    this.router.navigate(['/cns-portal/apiregistery'], { relativeTo: this.route });
  }

  goTokenRegistery() {
    this.router.navigate(['/cns-portal/tokenregistery'], { relativeTo: this.route });
  }


  //   mc;
  //   me;
  //   md;
  //   mv;
  //   send(val){
  //     console.log(val);
  //     this.menuGroupService.storeaddeditvalues(val);
  // this.mc=val.mcreate;
  // this.me=val.medit;
  // this.md=val.mdelete;
  // this.mv=val.mvisible;

}
