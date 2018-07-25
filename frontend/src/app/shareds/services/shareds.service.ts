import { Injectable } from "@angular/core";

@Injectable()

export class SharedsServeie {

  //ตำแหน่งของสมาชิก
  positionItems: any[] = [
    'Frontend Developer',
    'Backend Developer'
  ];

  //แปลงไฟล์รูปภาพ Base64
  onConvertImage(input: HTMLInputElement) {
    return new Promise((resolve, reject) => {
      const imageTypes = ['image/jpeg', 'image/png'];
      const imageSize = 300;
      //หากไม่มีการอัพโหลดภาพ
      if (input.files.length == 0)
        return resolve(null);
      //ตรวจสอบชนิดไฟล์ที่อัพโหลด
      if (imageTypes.indexOf(input.files[0].type) < 0) {
        return reject({ Message: 'กรุณาอัพโหลดรูปถาพเท่านั้น' });
      };
      //ตรวจสอบขนาดรูปภาพ
      if ((input.files[0].size / 1024) > imageSize)
        return reject({ Message: 'กรุณาอัพโหลดภาพไม่เกิน' + imageSize + 'KB' })

      const reader = new FileReader();
      reader.readAsDataURL(input.files[0]);
      //คืนค่าImage base64
      reader.addEventListener('load', () => resolve(reader.result));
    });
  }
}