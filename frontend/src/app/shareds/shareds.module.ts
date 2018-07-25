import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HSideMenuComponent } from './layouts/h-side-menu/h-side-menu.component';
import { HTopMenuComponent } from './layouts/h-top-menu/h-top-menu.component';
import { HContentComponent } from './layouts/h-content/h-content.component';
import { McBreadcrumbsModule } from 'ngx-breadcrumbs';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { AlertService } from './services/alert.service';
// import { AccountService } from './services/account.service';
import { ValidatorsService } from './services/validators.service';
// import { LaddaModule } from 'angular2-ladda';
import { ModalModule,BsDropdownModule ,PaginationModule,BsDatepickerModule} from 'ngx-bootstrap';
import { SharedsServeie } from './services/shareds.service';

//import ภาษาไทย
import { defineLocale } from 'ngx-bootstrap/chronos';
import { thLocale } from 'ngx-bootstrap/locale';
defineLocale('th', thLocale); 

@NgModule({
  imports: [
    CommonModule,
    McBreadcrumbsModule.forRoot(),
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot(),
    // LaddaModule,
  ],
  declarations: [
    HSideMenuComponent,
    HTopMenuComponent,
    HContentComponent
  ],
  exports: [
    HSideMenuComponent,
    HTopMenuComponent,
    HContentComponent,
    ReactiveFormsModule,
    FormsModule,
    ModalModule,
    BsDropdownModule,
    PaginationModule,
    BsDatepickerModule
  ],
  providers: [
    AlertService,
    // AccountService,
    ValidatorsService,
    SharedsServeie
  ]

})
export class SharedsModule { }
