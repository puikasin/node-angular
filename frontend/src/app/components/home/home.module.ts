import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GeneralComponent } from './general/general.component';
import { SettingComponent } from './setting/setting.component';
import { HomeRoutes } from './home.routing';
import { SharedsModule } from '../../shareds/shareds.module';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { AddUserComponent } from './profile/add-user/add-user.component';
import { MembersComponent } from './members/members.component';
import { MemberCreateComponent } from './member-create/member-create.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutes,
    SharedsModule,
  ],
  declarations: [
    DashboardComponent, 
    GeneralComponent, 
    SettingComponent, ProfileComponent, ChangePasswordComponent, AddUserComponent, MembersComponent, MemberCreateComponent
  ]
})
export class HomeModule { }
