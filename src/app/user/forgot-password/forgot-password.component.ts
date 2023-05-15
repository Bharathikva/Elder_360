import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/core/api.service';
import { AuthService } from 'src/app/core/auth.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  form: FormGroup;
  hidebutton=true;
  showOTPForm = false;
  otp!: string;
  newmessage3: any;

  showFirstDiv = true;
  showSecondDiv = false;

  constructor(private router: Router, private http: ApiService, private toast: NgToastService, private newauth: AuthService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      phoneNumber: ['', Validators.required],

    });

  }

  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };
  onOtpChange(otp: string) {
    this.otp = otp;
  }

  setVal(val: any) {
    this.ngOtpInput.setValue(val);
  }

  onSubmit() {
    const phoneNumber = this.form.value.phoneNumber;
    this.http.sendOTP(phoneNumber).subscribe(
      (data) => {
        console.log(data);
        
        this.toast.success({ detail: 'OTP sent successfully!' });
        this.showOTPForm = true;
        this.hidebutton = false;
      },
      () => {
        this.toast.error({ detail: 'Failed to send OTP.' });
      }
    );
  }

  back(){
    this.hidebutton=true;
  }

  onVerifyOTP() {
    const phoneNumber = this.form.value.phoneNumber;
    const otp = this.otp;


    this.http.verifyOTP(phoneNumber,otp).subscribe(data => {
      if (data) {

    
        console.log(data.loginid,"gullgyyuglgylguiugigiuuhgihuio;");
        window.sessionStorage.setItem('token', data.loginid);
        this.router.navigate(['/home/dashboard']);
        this.toast.success({ detail: 'OTP verified successfully!' });

      }
    }
      , err => {
        this.newmessage3 = err.error.message;
        this.toast.error({ detail: 'Failed to verify OTP.' });
      }
    );
  }

  //   navigateToLogin() {
  //     this.router.navigateByUrl('/home/dashboard');
  //  }

  ngOnInit() {
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('employerID');
    window.sessionStorage.removeItem('employeeID');

  }
}
