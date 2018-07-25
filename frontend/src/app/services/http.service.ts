import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from 'rxjs/operators';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  constructor(
    private http: HttpClient
  ) {

  }

  private address: string = 'http://localhost:3000/';
  // ส่ง Get
  requestGet(url: string) {
    return this.http
      .get(`${this.address}${url}`)
      .pipe(catchError(err => this.handelError(err)));
  }


  // ส่ง Post
  requestPost(url: string, body: any) {
    return this.http
      .post(`${this.address}${url}`, body)
      .pipe(catchError(err => this.handelError(err)));
  }

  // ปรับแต่ง Error
  private handelError(errResponse: HttpErrorResponse): Observable<any> {
    errResponse['Message'] = errResponse.message;
    if (errResponse.error && errResponse.error.message)
      errResponse['Message'] = errResponse.error.message;
    throw errResponse;

  }

}
