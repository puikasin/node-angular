import { Injectable } from "@angular/core";
import { IRegister } from "../../components/register/register.interface";
import { resolve, reject } from "q";
import { ILogin } from "../../components/login/login.interface";
import { IProfile } from "../../components/home/profile/profile.interface";
import { IChangePassword } from "../../components/home/profile/change-password/change-password.interface";
import { HttpService } from "../../services/http.service";


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(
    private http: HttpService
  ) { }

  public mockUserItems: IAccount[] = [

    {
      id: 1,
      fullname: 'Admin Admin',
      email: 'admin@mail.com',
      password: '123456',
      position: 'Frontend Developer',
      image: null,
      role: IRoleAccount.Admin,
      created: new Date(),
      updated: new Date(),
    },
    {
      id: 2,
      fullname: 'Employee  Employee',
      email: 'employee@mail.com',
      password: '123456',
      position: 'Backend Developer',
      image: null,
      role: IRoleAccount.Employee,
      created: new Date(),
      updated: new Date(),
    },
    {
      id: 3,
      fullname: 'Member Member',
      email: 'member@mail.com',
      password: '123456',
      position: 'Frontend Developer',
      image: null,
      role: IRoleAccount.Member,
      created: new Date(),
      updated: new Date(),
    },
  ];

  //เปลียนรหัสผ่านใหม่
  onChangePassword(accessToken: string, model: IChangePassword) {
    return new Promise((resolve, reject) => {
      const userProfile = this.mockUserItems.find(item => item.id == accessToken);
      if (!userProfile) return reject({ Message: 'ไม่มีข้อมูลผู้ใช้งาน' });
      if (userProfile.password != model.old_pass) return reject({ Message: 'รหัสผ่านเดิมไม่ถูกต้อง' });
      userProfile.password = model.new_pass;
      userProfile.updated = new Date();
      resolve(userProfile);
    });
  }

  //แก้ไขข้อมูลส่วนตัว
  onUpdateProfile(accessToken: string, model: IProfile) {
    return new Promise((resolve, reject) => {
      const userProfile = this.mockUserItems.find(user => user.id == accessToken);
      if (!userProfile) return reject({ Message: 'ไม่มีผู้ใช้นี้ในระบบ' });
      userProfile.fullname = model.fullname;
      userProfile.position = model.position;
      userProfile.image = model.image;
      userProfile.updated = new Date();
      resolve(userProfile);
    });
  }

  //ดึงข้อมมูลผู้เข้าใช้งานระบบจาก Token
  getUserLogin(accessToken: string) {
    return new Promise<IAccount>((resolve, reject) => {
      const userLogin = this.mockUserItems.find(m => m.id == accessToken)
      if (!userLogin) return reject({ Message: 'accessToken ไม่ถูกต้อง' })
      resolve(userLogin);
    });
  }

  //เข้าสู่ระบบ
  onLogin(model: ILogin) {
    return this.http
      .requestPost('api/account/login', model)
      .toPromise() as Promise<{ accessToken: string }>;
  }

  //ลงทะเบียน
  onRegister(model: IRegister) {
    return this.http
      .requestPost('api/account/register', model)
      .toPromise() as Promise<IAccount>;
  }
}

export interface IAccount {
  fullname: string;
  email: string;
  password: string;

  id?: any;
  position?: string;
  image?: string;
  role?: IRoleAccount;
  created?: Date;
  updated?: Date;
}
export enum IRoleAccount {
  Member = 1,
  Employee,
  Admin,
}