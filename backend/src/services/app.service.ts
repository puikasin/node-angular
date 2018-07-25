import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMemberDocument } from '../interfaces/member.interface';
import { IRegister, IAccount, RoleAccount, ILogin } from 'interfaces/app.interfaces';
import { generate, verify } from 'password-hash';

@Injectable()
export class AppService {
    constructor(
        @InjectModel('Member') private MemberCollection: Model<IMemberDocument>) {

    }

    // ลงทะเบียน
    async onRegister(body: IRegister) {

        const count = await this.MemberCollection.count({ email: body.email });
        if (count > 0)
            throw new BadRequestException('มีอีเมล์นี้ในระบบแล้ว');

        delete body.cpassword;
        const model: IAccount = body;
        model.password = generate(model.password);
        model.image = '';
        model.position = '';
        model.role = RoleAccount.Member;
        const modelItem = await this.MemberCollection.create(model);
        modelItem.password = '';
        return modelItem;
    }

    //ลงชื่อเข้าใช้งาน
    async onLogin(body: ILogin) {
        const member = await this.MemberCollection.findOne({ email: body.email });
        if (!member) throw new BadRequestException('ไม่มีผู้ใช้งานนี้ในระบบ')
        if (verify(body.password, member.password)) {
            return { accessToken: '' };
        }
        throw new BadRequestException('อีเมล์หรือรหัสผ่านไม่ถูกต้อง')
    }
}
