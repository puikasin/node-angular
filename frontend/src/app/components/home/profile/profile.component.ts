import { Component, OnInit, TemplateRef } from '@angular/core';
import { IProfileComponent } from './profile.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../../../shareds/services/account.service';
import { AlertService } from '../../../shareds/services/alert.service';
import { AuthenService } from '../../../services/authen.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { SharedsServeie } from '../../../shareds/services/shareds.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements IProfileComponent {
  constructor(
    private buider: FormBuilder,
    private account: AccountService,
    private authen: AuthenService,
    private alert: AlertService,
    private modalService: BsModalService,
    private shareds: SharedsServeie

  ) {
    this.initialCreateFormData();
    this.initialLoadUpdateFormData();
    //เพิ่ม positions
    this.positionItem = this.shareds.positionItems;
  }

  form: FormGroup;
  modalRef: BsModalRef;
  positionItem: any[] = [];

  //บันทึกข้อมูล
  onSubmit() {
    if (this.form.invalid) return this.alert.notify('กรุณากรอกข้อมูลให้ถูกต้อง')
    this.account
      .onUpdateProfile(this.authen.getAuthenticated(), this.form.value)
      .then(() => this.alert.notify('แก้ไขข้อมูลสำเร็จ', 'sucess'))
      .catch(err => this.alert.notify(err.Message));
    console.log(this.form.value)
  }

  //แปลงไฟล์รูปภาพ Base64
  onConvertImage(input: HTMLInputElement) {
    const imageControl = this.form.controls['image'];
   
    this.shareds
      .onConvertImage(input)
      .then(base64 => imageControl.setValue(base64))
      .catch(err => {
        input.value = null;
        imageControl.setValue(null);
        this.alert.notify(err.Message);
      });
  }

  //เปิด Modal
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  //สร้างฟอร์ม 
  private initialCreateFormData() {
    this.form = this.buider.group({
      email: [''],
      fullname: ['', Validators.required],
      position: ['', Validators.required],
      image: [null]
    });
    // disabled อีเมล์
    this.form.get('email').disable();
  }

  //โหลดข้อมูลใหม่พร้อมกับ Update form data
  private initialLoadUpdateFormData() {
    this.account
      .getUserLogin(this.authen.getAuthenticated())
      .then(user => {
        this.form.controls['email'].setValue(user.email);
        this.form.controls['fullname'].setValue(user.fullname);
        this.form.controls['position'].setValue(user.position);
        this.form.controls['image'].setValue(user.image);
      })
      .catch(err => this.alert.notify(err.Message));
  }
}
