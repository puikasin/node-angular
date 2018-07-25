import { Routes, RouterModule } from '@angular/router';
import { HomeURL } from './home.url';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GeneralComponent } from './general/general.component';
import { ProfileComponent } from './profile/profile.component';
import { MembersComponent } from './members/members.component';
import { MemberCreateComponent } from './member-create/member-create.component';
import { UserRoleGuard } from '../../guards/user-role.guard';
import { IRoleAccount } from '../../shareds/services/account.service';

const routes: Routes = [
  { path: '', redirectTo: HomeURL.Profile, pathMatch: 'full' },
  {
    path: HomeURL.Dashboard, component: DashboardComponent,
    canActivate: [UserRoleGuard],
    data: {
      breadcrumbs: 'Dashboard',
      roles: [IRoleAccount.Admin, IRoleAccount.Employee]
    }
  },
  {
    path: HomeURL.Profile, component: ProfileComponent,
    data: {
      breadcrumbs: 'ข้อมูลส่วนตัว'
    }
  },
  {
    path: HomeURL.Members, component: MembersComponent,
    canActivate: [UserRoleGuard],
    data: {
      breadcrumbs: 'ข้อมูลสมาชิก',
      roles: [IRoleAccount.Admin, IRoleAccount.Employee]
    }
  },
  {
    path: HomeURL.MemberCreate,
    canActivate: [UserRoleGuard],
    data: { roles: [IRoleAccount.Admin] },
    children: [
      {
        path: '', component: MemberCreateComponent,
        data: {
          breadcrumbs: 'เพิ่มสมาชิกใหม่'
        }
      },
      {
        path: ':id', component: MemberCreateComponent,
        data: {
          breadcrumbs: 'แกัไขข้อมูลสมาชิก'
        }
      }
    ]
  },

  { path: HomeURL.General, component: GeneralComponent }
];

export const HomeRoutes = RouterModule.forChild(routes);