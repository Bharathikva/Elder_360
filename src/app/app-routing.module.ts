import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { SignupComponent } from './user/signup/signup.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { GuestpageComponent } from './user/guestpage/guestpage.component';
import { PaymentComponent } from './user/payment/payment.component';

const routes: Routes = [
  // { path: '', component: GuestpageComponent,},
  { path: '', component: LoginComponent},
 {path:'signup',component:SignupComponent},
 {path:'dashboard',component:DashboardComponent},
 {path:'forgot',component:ForgotPasswordComponent},
 {path:'payment',component:PaymentComponent}
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
