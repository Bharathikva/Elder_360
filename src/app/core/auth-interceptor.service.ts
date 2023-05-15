import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private cookie:CookieService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const access_token = this.cookie.get('access_token');

    if (access_token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${access_token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && this.cookie.get('refresh_token')) {
          return this.authService.refreshAccessToken().pipe(
            switchMap((response: any) => {
              this.cookie.set('access_token', response.accessToken);
              this.cookie.set('refresh_token', response.refreshToken);
              console.log(response);
              
              request = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${response.accessToken}`
                }
              });
              return next.handle(request);
            }),
            catchError((error: any) => {
             this.cookie.delete('access_token');
             this.cookie.delete('refresh_token');
              return throwError(error);
            })
          );
        }
        return throwError(error);
      })
    );
  }
}
