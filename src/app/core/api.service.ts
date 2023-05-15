import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { ApiResponse } from '../model/api.response.service';
import development from '../core/url-handler.service'
import { User } from '../model/User.response';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl= development.baseUrl;

  constructor(private http: HttpClient, private router: Router,) { }

  login(loginPayload:any):Observable<any>{
    return this.http.post<any>(this.baseurl+development.login,loginPayload)
  };

  signUp(user:User):Observable<ApiResponse>{
    return this.http.post<ApiResponse>(this.baseurl+development.signUp,user)
  }

  hello():Observable<any>{
    return this.http.get<any>(this.baseurl+development.hello)
  }

  sendOTP(phoneNumber: string) {
    return this.http.post(this.baseurl + development.sendOtp,{ phone: phoneNumber },{ observe: 'response' });
  }

  verifyOTP(phoneNumber: string, otp: string): Observable<any> {
    return this.http.post(this.baseurl + development.verifyOTP, { phone: phoneNumber, otp: otp });
  }
  

}
