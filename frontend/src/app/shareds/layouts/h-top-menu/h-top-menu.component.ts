import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenService } from '../../../services/authen.service';
import { HomeURL } from '../../../components/home/home.url';
import { AppURL } from '../../../app.url';
import { AlertService } from '../../services/alert.service';
import { IHTopComponent } from './h-top-menu.interface';
import { IAccount, AccountService } from '../../services/account.service';

@Component({
  selector: 'app-h-top-menu',
  templateUrl: './h-top-menu.component.html',
  styleUrls: ['./h-top-menu.component.css']
})
export class HTopMenuComponent implements OnInit, IHTopComponent {

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

  onLogout() {
    this.alert.notify('ออกจากระบบสำเร็จ', 'info');
    this.authen.clearAuthenticated();
    this.router.navigate(['/', AppURL.Login])
  }

  //โหลดขัอมมูล User ที่เข้ามาจาก token
  private initalLoadLogin() {
    this.account
      .getUserLogin(this.authen.getAuthenticated())
      .then(userLogin => {
        this.UserLogin = userLogin;
        // console.log(this.UserLogin);
      })
      .catch(err => {
        this.alert.notify(err.Message);
        this.authen.clearAuthenticated();
        this.router.navigate(['/', AppURL.Login]);
      });
  }
}
