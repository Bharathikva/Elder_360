import { HttpStatusCode } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/core/api.service';
import { AuthService } from 'src/app/core/auth.service';
// import { DeviceDetectorService } from 'ngx-device-detector';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup;
  hidebutton=true;
  showOTPForm = false;
  otp!: string;
  newmessage3: any;
  newOtp:any='';
  

  constructor(private router: Router, private http: ApiService, private toast: NgToastService, private newauth: AuthService, private formBuilder: FormBuilder, private cookie:CookieService,) {
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
      (data:any) => {
        console.log('Status code:', data.status);
        console.log(data);
        
        this.cookie.set('token', data.body.data.token);
        this.newOtp = data.body.data.otp
        this.toast.success({ detail: 'OTP sent successfully!' });
        this.showOTPForm = true;
        this.hidebutton = false;
      },
      error => {
        console.log(error.status);
        
        this.toast.error({ detail: 'Failed to send OTP.' });
        // this.router.navigate(['/signup']);
      }
    );
  }

  back(){
    this.hidebutton=true;
  }

  onVerifyOTP() {
   
    const Token = this.cookie.get('token');
    const token = Token;
    const otp = this.otp;
    
    this.http.verifyOTP(Token,otp).subscribe(data => {
      if (data) {
        this.cookie.set('authToken', data.body.data.token);
        // this.cookie.set('user', data);
        this.toast.success({ detail: 'OTP verified successfully!' });
        this.router.navigate(['/home']);
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
   this.cookie.delete('token');
   this.cookie.delete('authToken');
    

  }






}
