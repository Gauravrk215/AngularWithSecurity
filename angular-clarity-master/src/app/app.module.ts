import { ExcelService } from './services/excel.service';
import { BrowserModule } from '@angular/platform-browser';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS,HttpClient } from '@angular/common/http';
import { MainModule } from './modules/main/main.module';
import { LoginModule } from './modules/login/login.module';
import { MainService } from './services/main.service';
import { AlertService } from './services/alert.service';
import { HelperModule } from './pipes/helpers.module';
import { LogoComponent } from './modules/logo/logo.component';
import { AppConfig } from './app-config';
import { JwtInterceptor } from './services/jwt.interceptor';
import { UserInfoService } from './services/user-info.service';
import { AuthGuard } from './services/auth_guard.service';
import { LoginService } from './services/api/login.service';
import { ApiRequestService } from './services/api/api-request.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { TranslateService } from './services/api/translate.service';
import { RealnetMenuService } from './services/api/realnet-menu.service';
import { UserProfileService } from './services/admin/user-profile.service';
import { DragDropModule  } from '@angular/cdk/drag-drop';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import '@clr/icons';
import '@clr/icons/shapes/all-shapes';
import { AboutComponent } from './modules/main/admin/about/about.component';
import { LayoutComponent } from './modules/main/layout/layout.component';
import { SetupiconComponent } from './modules/main/builder/setupicon/setupicon.component';
import { MenumaintanceComponent } from './modules/main/admin/menumaintance/menumaintance.component';
import { UsermaintanceComponent } from './modules/main/admin/usermaintance/usermaintance.component';
import { UsergrpmaintenanceComponent } from './modules/main/admin/usergrpmaintenance/usergrpmaintenance.component';
import { MenuaccesscontrolComponent } from './modules/main/admin/menuaccesscontrol/menuaccesscontrol.component';

import { SystemparametersComponent } from './modules/main/admin/systemparameters/systemparameters.component';
import { AccesstypeComponent } from './modules/main/admin/accesstype/accesstype.component';
import { SequencegenaratorComponent } from './modules/main/fnd/sequencegenarator/sequencegenarator.component';
import { ReportbuildallComponent } from './modules/main/builder/report-build/reportbuildall/reportbuildall.component';
import { ReportrunnerallComponent } from './modules/main/builder/report-runner/reportrunnerall/reportrunnerall.component';
import { ReportbuildaddComponent } from './modules/main/builder/report-build/reportbuildadd/reportbuildadd.component';
import { DashboardrunnerComponent } from './modules/main/builder/dashboardrunner/dashboardrunner.component';
import { DashrunnerallComponent } from './modules/main/builder/dashboardrunner/dashrunnerall/dashrunnerall.component';
import { AllnewdashComponent } from './modules/main/builder/dashboardnew/allnewdash/allnewdash.component';
import { AddnewdashComponent } from './modules/main/builder/dashboardnew/addnewdash/addnewdash.component';
import { DashboardComponent } from './modules/main/fnd/dashboard/dashboard.component';
import { ReportBuild2allComponent } from './modules/main/builder/report-build2/report-build2all/report-build2all.component';
import { ReportBuild2addComponent } from './modules/main/builder/report-build2/report-build2add/report-build2add.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http , './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
  AboutComponent,
  AccesstypeComponent,
  SequencegenaratorComponent,
LayoutComponent,
SetupiconComponent,
MenumaintanceComponent,
UsermaintanceComponent,
UsergrpmaintenanceComponent,
MenuaccesscontrolComponent,
SystemparametersComponent,
ReportbuildallComponent,
ReportrunnerallComponent,
ReportbuildaddComponent,
DashboardrunnerComponent,
DashrunnerallComponent,
AllnewdashComponent,
AddnewdashComponent,
DashboardComponent,
ReportBuild2allComponent,
ReportBuild2addComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HelperModule,
    MainModule,
    LoginModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })

  ],
  providers: [
    MainService,
    AlertService,
    ExcelService,
    UserInfoService,
    LoginService,
    ApiRequestService,
    TranslateService,
    RealnetMenuService,
    UserProfileService,
    // ProjectSetupService,
    // TechnologyStackService,
    // DropdownService,
    // WireframeService,
    // SuregitService,
    AuthGuard,
    AppConfig,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy }  // HashLocationStrategy  to use # and remove # PathLocationStrategy
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA  ]
})
export class AppModule { }
