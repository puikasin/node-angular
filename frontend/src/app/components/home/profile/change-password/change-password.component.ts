import { Component, OnInit, Input } from '@angular/core';
import { IChangePasswordComponent } from './change-password.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../../../shareds/services/alert.service';
import { ValidatorsService } from '../../../../shareds/services/validators.service';
import { AccountService } from '../../../../shareds/services/account.service';
import { AuthenService } from '../../../../services/authen.service';
import { BsModalRef } from 'ngx-bootstrap';
declare let $;
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements IChangePasswordComponent {
  constructor(
    private builder: FormBuilder,
    private alert: AlertService,
    private validators: ValidatorsService,
    private account: AccountService,
    private authen: AuthenService,

  ) {
    this.initialCreateFormData();
  }

  form: FormGroup;
  @Input('modalRef') modalRef: BsModalRef;

  //เปลียนรหัสผ่าน
  onSubmit() {
    if (this.form.invalid) return this.alert.notify('ข้อมูลไม่ถูกต้อง');
    this.account.onChangePassword(this.authen.getAuthenticated(), this.form.value)
      .then(user => {
        this.alert.notify('เปลียนรหัสผ่านสำำเร็จ', 'success');
        $('.modal').modal('hide');
        this.form = this.builder.group({
          old_pass: [''],
          new_pass: [''],
          cnew_pass: [''],
        });
      })
      .catch(err => {
        this.alert.notify(err.Message);

      });

  }

  //สร้างฟอร์ม
  private initialCreateFormData() {
    this.form = this.builder.group({
      old_pass: ['', [Validators.required]],
      new_pass: ['', [Validators.required, this.validators.isPassword]],
      cnew_pass: ['', [Validators.required, this.validators.comparePassword('new_pass')]]
    });
  }



}
