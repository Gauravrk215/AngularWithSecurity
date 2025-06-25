import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { Rn_Forms_Setup } from 'src/app/models/Rn_Forms_Setup';
// import { FormSetupService } from 'src/app/services/api/form-setup.service';
// import { Rn_Menu_Group_Header } from 'src/app/models/Rn_Menu_Group_Header';
// import { MenuGroupService } from 'src/app/services/api/menu-group.service';

@Component({
	selector: 'readonly-menu-group',
	templateUrl: './readonly-menu-group.component.html',
    styleUrls: [ './readonly-menu-group.scss'],
})
export class ReadOnlyMenuGroupComponent implements OnInit {
    basic: boolean = false;
    id: number;
    // rn_menu_group_header: Rn_Menu_Group_Header;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        //  private menuGroupService: MenuGroupService
    ) { }

    ngOnInit() {
        // this.getById();
    }

    // getById() {
    //     this.rn_menu_group_header = new Rn_Menu_Group_Header();
    //     this.id = this.route.snapshot.params['id'];
    //     this.menuGroupService.getById(this.id)
    //         .subscribe(data => {
    //             console.log(data);
    //             this.rn_menu_group_header = data;
    //         });
    // }

    // goToWhoColumns() {
    //     this.basic = !this.basic;
    // }

    // back() {
    //     this.router.navigate(['../../all'], {relativeTo: this.route});
    // }
}
