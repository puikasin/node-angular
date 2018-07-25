import { IRegister } from "interfaces/app.interfaces";
import { IsNotEmpty, IsEmail, Matches } from "class-validator";
import { IsComparePassword } from "pipes/validation.pipe";

export class RegisterModel implements IRegister {
  @IsNotEmpty({message:'กรุณากรอก ชื่อ-สกุล'})
  fullname: string;

  @IsNotEmpty({message:'กรุณากรอก Email'})
  @IsEmail()
  email: string;

  @IsNotEmpty({message:'กรุณากรอก Password'})
  @Matches(/^[A-z0-9]{6}$/)
  password: string;

  @IsNotEmpty({message:'กรุณากรอก ยืนยันรหัสผ่าน'})
  @IsComparePassword('password')
  cpassword: string;

}