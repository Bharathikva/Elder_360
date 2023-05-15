import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { ApiService } from './core/api.service';
import { AuthService } from './core/auth.service';
import { AuthInterceptor } from './core/auth-interceptor.service';
import { NgToastModule } from 'ng-angular-popup';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { GuestpageComponent } from './user/guestpage/guestpage.component';
import { UploadFileService } from './core/upload-file.service';
import { PaymentComponent } from './user/payment/payment.component';
import { PaymentService } from './core/payment.service';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    GuestpageComponent,
    PaymentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    NgOtpInputModule,
  ],
  providers: [UploadFileService, PaymentService,
    AuthService, ApiService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
