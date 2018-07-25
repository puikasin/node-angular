import { Component, OnInit } from '@angular/core';
import { IMemberCreateComponent } from './member-create.interface';
import { IRoleAccount } from '../../../shareds/services/account.service';
import { SharedsServeie } from '../../../shareds/services/shareds.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../../shareds/services/alert.service';
import { ValidatorsService } from '../../../shareds/services/validators.service';
import { MemberService } from '../../services/member.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppURL } from '../../../app.url';
import { HomeURL } from '../home.url';

@Component({
	selector: 'app-member-create',
	templateUrl: './member-create.component.html',
	styleUrls: ['./member-create.component.css'],
	providers: [MemberService],
})
export class MemberCreateComponent implements IMemberCreateComponent {

	constructor(
		private shaerds: SharedsServeie,
		private builder: FormBuilder,
		private alert: AlertService,
		private validators: ValidatorsService,
		private member: MemberService,
		private router: Router,
		private activatedRouter: ActivatedRoute
	) {

		this.activatedRouter.params.forEach(params => {
			this.memId = params.id;
		});

		//สร้างฟอร์ม
		this.initialCreateFormData();
		//สร้างฟอร์มอัพเดท
		this.initialUpdateFormData();
		//เพิ่ม positions
		this.positionItems = this.shaerds.positionItems;
	}

	form: FormGroup;
	memId: any;
	positionItems: string[];
	roleItems: IRoleAccount[] = [
		IRoleAccount.Member,
		IRoleAccount.Employee,
		IRoleAccount.Admin,
	];

	//บันทึกหรือแก้ไข
	onSubmit(): void {
		if (this.form.invalid)
			return this.alert.notify('กรุณากรอกข้อมูลให้ครบ');
		//ตรวจสอบ หากเป็นเพิ่มสมาชิกใหม่
		if (!this.memId) {
			this.member
				.createMember(this.form.value)
				.then(res => {
					this.alert.notify('บันทึกข้อมูลสำเร็จ', 'success');
					this.router.navigate(['/', AppURL.Home, HomeURL.Members])
				})
				.catch(err => this.alert.notify(err.Message));
		}
		//ตรวจสอบ หากเป็นแก้ไข
		else {
			this.member.updateMember(this.memId, this.form.value)
				.then(res => {
					this.alert.notify('แก้ไขข้อมูลสำเร็จ', 'success');
					this.router.navigate(['/', AppURL.Home, HomeURL.Members])
				})
				.catch(err => this.alert.notify(err.Message));
		}
	}

	//แสดงชื่อสิทธิ์ผู้ใช้เป็นตัวหนังสือ
	getRoleName(role: IRoleAccount): string {
		return IRoleAccount[role];
	}

	//แสดงตัวอย่างภาพอัพโหลด
	onConvertImage(input: HTMLInputElement) {
		const imageControl = this.form.controls['image'];
		this.shaerds
			.onConvertImage(input)
			.then(base64 => imageControl.setValue(base64))
			.catch(err => {
				input.value = null;
				imageControl.setValue(null);
				this.alert.notify(err.Message);
			});
	}

	//สร้างฟอร์ม
	private initialCreateFormData() {
		this.form = this.builder.group({
			image: [],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, this.validators.isPassword]],
			fullname: ['', Validators.required],
			position: ['', Validators.required],
			role: ['', Validators.required],
		})
	}

	//แก้ไขฟอร์ม
	private initialUpdateFormData() {
		if (!this.memId) return;
		// const member = this.member
		this.member.getMemberById(this.memId)
			.then(member => {
				//นำข้อมูลมาใส่ฟอร์ม
				const form = this.form;
				form.controls['image'].setValue(member.image);
				form.controls['email'].setValue(member.email);
				form.controls['fullname'].setValue(member.fullname);
				form.controls['position'].setValue(member.position);
				form.controls['role'].setValue(member.role);
				form.controls['password'].setValidators(this.validators.isPassword);
			})
			.catch(err => {
				this.alert.notify(err.Message);
				this.router.navigate(['', AppURL.Home, HomeURL.Members]);
			});
	}
}
