import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { ApiResponse } from '../model/api.response.service';
import {API} from '../core/url-handler.service'
import { User } from '../model/User.response';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  @Inject(API)
  private readonly apiEndPoints!:API

  // baseurl= development.baseUrl;

  constructor(private http: HttpClient, private router: Router,) { }

  login(loginPayload:any):Observable<any>{
    return this.http.post<any>(this.apiEndPoints.LOGIN,loginPayload)
  };

  signUp(user:User):Observable<ApiResponse>{
    return this.http.post<ApiResponse>(this.apiEndPoints.SIGNUP,user)
  }

  hello():Observable<any>{
    return this.http.get<any>(this.apiEndPoints.PROFILE)
  }

  sendOTP(phoneNumber: string) {
    return this.http.post(this.apiEndPoints.SEND_OTP,{ phone: phoneNumber },{ observe: 'response' });
  }

  verifyOTP(phoneNumber: string, otp: string): Observable<any> {
    return this.http.post(this.apiEndPoints.VERIFY_OTP, { phone: phoneNumber, otp: otp });
  }


}
