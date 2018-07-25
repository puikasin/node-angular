import { Injectable } from "@angular/core";
declare let $: any;
declare let swal: any;
@Injectable()
export class AlertService {
  notify(text: string, icon = 'warning') {
    $.toast({
      heading: 'แจ้งเตือน',
      text: text,
      position: 'top-right',
      icon: icon,
      hideAfter: 3000,
      stack: 1

    });
  }

  confirm(message: string = 'คุณต้องการจะทำรายการต่อไปหรือไม่'): Promise<any> {
    return swal(message,{
     buttons:["ยกเลิก","ยืนยัน"],
     dangerMode:true
    })
  }
}