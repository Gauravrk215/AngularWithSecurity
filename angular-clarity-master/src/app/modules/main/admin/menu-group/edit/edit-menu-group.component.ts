import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
// import { Rn_Menu_Group_Line } from "src/app/models/Rn_Menu_Group_Line";
// import { Rn_Menu_Group_Header } from "src/app/models/Rn_Menu_Group_Header";
// import { MenuGroupService } from "src/app/services/api/menu-group.service";
// import { MenuRegisterService } from "src/app/services/api/menu-register.service";

@Component({
  selector: "edit-menu-group",
  templateUrl: "./edit-menu-group.component.html",
  styleUrls: ["./edit-menu-group.scss"],
})
export class EditMenuGroupComponent implements OnInit {
  updated = false;
  // rn_menu_group_header: Rn_Menu_Group_Header;
  // rn_menu_group_line: Rn_Menu_Group_Line[];
  id: number;

  types = ['user', 'admin', 'mis report', 'bi report'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    // private menuRegisterService: MenuRegisterService,
    // private menuGroupService: MenuGroupService
  ) {}

  ngOnInit() {
    //this.getMapings();

    // this.rn_menu_group_header = new Rn_Menu_Group_Header();
    // this.id = this.route.snapshot.params["id"];
    // console.log("update with id = ", this.id);
    // this.getById(this.id);
  }

//   getById(id: number) {
//     this.menuGroupService.getById(id).subscribe((data) => {
//       this.rn_menu_group_header = data;
//       this.rn_menu_group_line = data.menu_group_lines;
//     });
//   }

//   update() {
//     this.menuGroupService.update(this.id, this.rn_menu_group_header).subscribe(
//       (resp) => {
//         console.log(resp);
//         this.router.navigate(["../../all"], { relativeTo: this.route });
//       },
//       (error: HttpErrorResponse) => {
//         console.log(error.message);
//       }
//     );
//     this.rn_menu_group_header = new Rn_Menu_Group_Header();
//   }

//   onSubmit() {
//     this.updated = true;
//     this.update();
//   }
  
// /*   getMapings() {
//     this.httpService
//       .get<Mapping[]>('./assets/json/form-setup-mapping.json')
//       .subscribe(data => {
//         console.log(data);
//         this.mappings = data;
//         }, err => console.log(err)
//       )
//   } */

//   menuDate: any[];
//   menuDropDown: any[];
//   getMenuData() {
//     //this.menuRegisterService.getAll().subscribe((data) => {
//     this.menuRegisterService.getByAccountId().subscribe((data) => {
//       this.menuDate = data;
//       console.log('Menu List by Account Id : ', this.menuDate);
//       const keys = this.menuDate.map((item) => {
//         const container = {id: '', name: ''};
//         container.id = item.id;
//         container.name = item.main_menu_name;
//           return container;
//         });
//         console.log('Menu dropdown: ', keys);
//         this.menuDropDown = keys;
//       }, (err) => {
//         console.log(err)
//       }
//     );
//   }

//   back() {
//     this.router.navigate(["../../all"], { relativeTo: this.route });
//   }
}
