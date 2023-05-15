import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { API } from './url-handler.service';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private cookie: CookieService,private readonly apiEndPoints:API) { }

  refreshAccessToken() {
    const refresh_token = this.cookie.get('refresh_token');

    return this.http.post(this.apiEndPoints.GENERATE_REF_ACCESS_TOKEN, {
      refresh_token, client_id: '1',
      client_secret: 'secret',
      grant_type: 'refresh_token'
    });
  }
}
