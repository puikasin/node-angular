import { Injectable } from "@angular/core";
import { AccountService, IAccount, IRoleAccount } from '../../shareds/services/account.service';
import { IMemberSearch, IMember } from "../home/members/members.interface";
import { resolve } from "url";


@Injectable()
export class MemberService {
  constructor(private account: AccountService) {
    if (this.account.mockUserItems.length <= 2) {
      this.generateMembers();
    }
  }

  // ดึงข้อมูลสมาชิกทังหมด
  getMembers(options?: IMemberSearch) {
    return new Promise<IMember>((resolve, reject) => {
      // เรียงลำดับข้อมูลใหม่จากวันที่แก้ไขล่าสุด
      let items = this.account.mockUserItems.sort((a1, a2) => {
        return Date.parse(a2.updated.toString()) - Date.parse(a1.updated.toString())
      });

      // คำนวณเรื่อง Pagination
      const startItem = (options.startPage - 1) * options.limitPage;
      const endItem = options.startPage * options.limitPage;

      // หากมีการค้นหาข้อมูล
      if (options && options.searchText && options.searchType) {
        // ค้นหาข้อมูลมาเก็บไว้ในตัวแปร items
        items = this.account
          .mockUserItems
          .filter(item => {
            switch (options.searchType) {
              case 'updated':
                return item.updated >= options.searchText['form'] && item.updated <= options.searchText['to'];
              default:
                return item[options.searchType].toString().toLowerCase()
                  .indexOf(options.searchText.toString().toLowerCase()) >= 0
            }
          }
          );
      }
      resolve({ items: items.slice(startItem, endItem), totalItems: items.length });
    });
  }

  //ดึงข้อมูลสมาชิกคนเดียว
  getMemberById(id) {
    return new Promise<IAccount>((resolve, reject) => {
      const member = this.account.mockUserItems.find(item => item.id == id);
      if (!member) return reject({ Message: 'ไม่มีข้อมูลสมาชิกในระบบ' });
      resolve(member);
    })
  }
  // เพิ่มข้อมูลสมาชิก
  createMember(model: IAccount) {
    return new Promise<IAccount>((resolve, reject) => {
      if (this.account.mockUserItems.find(item => item.email == model.email))
        return reject({ Message: 'อีเมล์นี้มีในระบบแล้ว' });
      model.id = Math.random();
      model.created = new Date();
      model.updated = new Date();

      this.account.mockUserItems.push();
      resolve(model);
    });
  }

  // ลบข้อมูลสมาชิก
  deleteMember(id: any) {
    return new Promise((resolve, reject) => {
      const findIndex = this.account.mockUserItems.findIndex(item => item.id == id);
      if (findIndex < 0) return reject({ Message: 'ไม่มีข้อมูลนี้ในระบบ' });
      resolve(this.account.mockUserItems.splice(findIndex, 1))
    });
  }

  // แก้ไขสมาชิก
  updateMember(id: any, model: IAccount) {
    return new Promise<IAccount>((resolve, reject) => {
      const member = this.account.mockUserItems.find(item => item.id == id);
      if (!member) return reject({ Message: 'ไม่มีข้อมูลผู้ใช้ในระบบ' })
      //ตรวจสอบอีเมล์
      if (this.account.mockUserItems.find(item => {
        return item.email == model.email && model.email != member.email;
      })) return reject({ Message: 'มีอีเมล์นี้อยู่ในระบบแล้ว' });

      member.email = model.email;
      member.password = model.password || member.password; //หาหไม่กรอกpassword ใช้ตัวเดิม
      member.fullname = model.fullname;
      member.position = model.position;
      member.role = model.role;
      member.image = model.image;
      member.updated = new Date();
      resolve(member);
    });
  }

  // จำลองข้อมูลสมาชิก เพื่อทำ pagination
  private generateMembers() {
    const positions = ['Frontend Developer', 'Backend Developer'];
    const roles = [IRoleAccount.Member, IRoleAccount.Employee, IRoleAccount.Admin];
    for (let i = 3; i <= 2000; i++)
      this.account.mockUserItems.push({
        id: i.toString(),
        fullname: `Lastname ${i}`,
        email: `mail-${i}@mail.com`,
        password: '123456',
        position: positions[Math.round(Math.random() * 1)],
        role: roles[Math.round(Math.random() * 2)],
        created: new Date(),
        updated: new Date(2018, 4, Math.round(Math.random() * 24 + 1))
      });
  }
}