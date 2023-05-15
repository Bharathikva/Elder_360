import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthService {
  private refreshTokenUrl = 'http://localhost:8080/token/auth';

  constructor(private http: HttpClient, private cookie: CookieService) { }

  refreshAccessToken() {
    const refresh_token = this.cookie.get('refresh_token');

    return this.http.post(this.refreshTokenUrl, {
      refresh_token, client_id: '1',
      client_secret: 'secret',
      grant_type: 'refresh_token'
    });
  }
}
