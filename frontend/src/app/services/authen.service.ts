import { Injectable } from "@angular/core";

@Injectable({
  providedIn:'root'
})
export class AuthenService {
  private accessKey = 'accessKey';

  //กำหนดค่า access token ไว้ในความจำ browser
  setAuthenticated(accessToken: string): void {
    localStorage.setItem(this.accessKey, accessToken);
  }
  //ดึงค่า access token ไว้ในความจำ browser
  getAuthenticated(): string {
    return localStorage.getItem(this.accessKey);
  }
  //ล้างค่า access token ไว้ในความจำ browser
  clearAuthenticated():void{
    localStorage.removeItem(this.accessKey);
  }
}