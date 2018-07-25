import { Component, OnInit } from '@angular/core';
import { AppURL } from '../../app.url';
import { ILoginComponent } from './login.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../shareds/services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../../shareds/services/account.service';
import { AuthenService } from '../../services/authen.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements ILoginComponent {

  constructor(
    private builder: FormBuilder,
    private alert: AlertService,
    private router: Router,
    private account: AccountService,
    private authen: AuthenService,
    private activateRoute: ActivatedRoute

  ) {
    //เก็บค่า return URl
    this.activateRoute.params.forEach(params => {
      this.returnURl = params.returnURl || `/${AppURL.Home}`;
  
    });
    this.initalCreateFormData();
  }

  Url = AppURL;
  returnURl:string;
  form: FormGroup;

  //เข้าสู่ระบบ
  onSubmit(): void {
    if (this.form.invalid)
      return this.alert.notify('อีเมล์หรือรหัสผ่านไม่ถูกต้อง', 'error')
    this.account
      .onLogin(this.form.value)
      .then(res => {
        //เก็บ session
        this.authen.setAuthenticated(res.accessToken);
        //alert และ router page
        this.alert.notify('เข้าสู่ระบบเรียบร้อย', 'success');
        this.router.navigateByUrl(this.returnURl);

      })
      .catch(err => this.alert.notify(err.Message));
  }
  //สร้างฟอร์ม
  private initalCreateFormData() {
    this.form = this.builder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      remember: []
    });
  }
}
