import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { IMembersComponent, IMemberSearchKey, IMemberSearch, IMember } from './members.interface';
import { IAccount, IRoleAccount, AccountService } from '../../../shareds/services/account.service';
import { AlertService } from '../../../shareds/services/alert.service';
import { PageChangedEvent, BsLocaleService } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { AppURL } from '../../../app.url';
import { HomeURL } from '../home.url';
import { AuthenService } from '../../../services/authen.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  providers: [MemberService]
})
export class MembersComponent implements IMembersComponent {
  constructor(
    private member: MemberService,
    private alert: AlertService,
    private detect: ChangeDetectorRef,
    private router: Router,
    private localeService: BsLocaleService,
    private authen: AuthenService,
    private account: AccountService

  ) {
    //กำหนดภาษาไทย Datepicker
    this.localeService.use('th');

    //โหลดข้อมูลสมาชิก
    this.initialLoadMembers({
      startPage: this.startPage,
      limitPage: this.limitPage
    });
    //กำหนดค่า serachType
    this.serachType = this.searchTypeItems[0];
    //โหลด User
    this.initialLoadUserLogin();
  }

  items: IMember;

  // ตัวแปรสำหรับค้นหา
  searchText: string = '';
  serachType: IMemberSearchKey;
  searchTypeItems: IMemberSearchKey[] = [
    { key: 'email', value: 'ค้นหาจากอีเมล์' },
    { key: 'fullname', value: 'ค้นหาจากชื่อ' },
    { key: 'position', value: 'ค้นหาจากตำแหน่ง' },
    { key: 'role', value: 'ค้นหาจากสิทธิ์ผู้ใช้' },
    { key: 'updated', value: 'ค้นหาจากวันที่' },

  ];

  // ตัวแปร pagination 
  startPage: number = 1;
  limitPage: number = 10;

  // ตรวจสอบสิทธิ์
  UserLogin: IAccount;
  Role = IRoleAccount;

  // เปลี่ยนหน้า pagination
  onPageChanged(page: PageChangedEvent) {
    this.initialLoadMembers({
      searchText: this.getSearchText,
      searchType: this.serachType.key,
      startPage: page.page,
      limitPage: page.itemsPerPage
    });
  }

  // ค้นหาข้อมูล
  onSearchItem() {
    this.startPage = 1;
    this.initialLoadMembers({
      searchText: this.getSearchText,
      searchType: this.serachType.key,
      startPage: this.startPage,
      limitPage: this.limitPage
    });
    // กระตุ้น Event
    this.detect.detectChanges();
  }

  // แกัไขสมาชิก
  onUpdateMember(item: IAccount) {
    this.router.navigate(['/',
      AppURL.Home,
      HomeURL.MemberCreate,
      item.id
    ], )
  }

  // แสดงชื่อสิทธิ์ผู้ใช้งาน
  getRoleName(role: IRoleAccount) {
    return IRoleAccount[role];
  }

  // ลบข้อมูลสมาชิก
  onDeleteMember(item: IAccount) {
    this.alert.confirm().then(status => {
      if (!status) return;
      this.member
        .deleteMember(item.id)
        .then(() => {
          // โหลดข้อมูลสมาชิกมใหม่
          this.initialLoadMembers({
            searchText: this.getSearchText,
            searchType: this.serachType.key,
            startPage: this.startPage,
            limitPage: this.limitPage,
          });
          this.alert.notify('ลบข้อมูลสำเร็จ', 'success');
        })
        .catch(err => this.alert.notify(err.Message));
    });
  }

  // ตรวจสอบและ return Text
  private get getSearchText() {
    let responseSearchText = null;
    switch (this.serachType.key) {
      case 'role':
        responseSearchText = IRoleAccount[this.searchText] || '';
        break;
      case 'updated':
        const serachDate: { form: Date, to: Date } = { form: this.searchText[0], to: this.searchText[1] } as any;
        serachDate.form.setHours(0);
        serachDate.form.setMinutes(0);
        serachDate.form.setSeconds(0);
        serachDate.to.setHours(23);
        serachDate.to.setMinutes(59);
        serachDate.to.setSeconds(59);
        responseSearchText = serachDate;
        break;
      default:
        responseSearchText = this.searchText;
        break;
    }
    return responseSearchText;
  }
  // โหลดข้อมูลสมาชิก
  private initialLoadMembers(options?: IMemberSearch) {
    this.member
      .getMembers(options)
      .then(items => this.items = items)
      .catch(err => this.alert.notify(err.Message));
  }

  // โหลด User Login
  private initialLoadUserLogin() {
    this.account
      .getUserLogin(this.authen.getAuthenticated())
      .then(userLogin => this.UserLogin = userLogin)
      .catch(err => this.alert.notify(err.Message))
  }


}
