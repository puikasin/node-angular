import { Component, OnInit } from '@angular/core';
import { HomeURL } from '../../../components/home/home.url';
import { AppURL } from '../../../app.url';
import { IAccount, IRoleAccount, AccountService } from '../../services/account.service';
import { IHomeSidebarComponent } from './h-side.interface';
import { Router } from '@angular/router';
import { AuthenService } from '../../../services/authen.service';
import { AlertService } from '../../services/alert.service';
declare let App: any

@Component({
  selector: 'app-h-side-menu',
  templateUrl: './h-side-menu.component.html',
  styleUrls: ['./h-side-menu.component.css']
})
export class HSideMenuComponent implements OnInit, IHomeSidebarComponent {

  constructor(
    private router: Router,
    private authen: AuthenService,
    private alert: AlertService,
    private account: AccountService,

  ) { }

  ngOnInit() {
    this.initalLoadLogin();
  }


  HomeURL = HomeURL;
  AppURL = AppURL;
  UserLogin: IAccount;
  Role = IRoleAccount;

  //โหลดขัอมมูล User ที่เข้ามาจาก token
  private initalLoadLogin() {
    this.account
      .getUserLogin(this.authen.getAuthenticated())
      .then(userLogin => {
        this.UserLogin = userLogin;
        //โหลดข้อมูล script สำหรับ Sidebar
        setTimeout(() => App.initialLoadPage(), 100)

      })
      .catch(err => {
        this.alert.notify(err.Message);
        this.authen.clearAuthenticated();
        this.router.navigate(['/', AppURL.Login]);
      });
  }

}
