import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/core/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signForm!: FormGroup;

  constructor(private router: Router, private http: ApiService, private formBuilder: FormBuilder, private cookie: CookieService, private toast: NgToastService) { }

  ngOnInit() {
    this.signForm = this.formBuilder.group({
      name: ['', Validators.required],
      email:['',Validators.required],
      gender: ['', Validators.required],
      birthDate: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    console.log('dsssssssssss');
    
    this.http.signUp(this.signForm.value)
      .subscribe(data => {
        console.log(data);
        
        this.router.navigate(['/login'])
        this.toast.success({ detail: 'User Added Successfully', duration: 3000 });
      })
    console.log(this.signForm.value);

  }

  // signup(){
  //   this.toast.success({ detail: 'User Added Successfully', duration: 3000 });
  //   this.router.navigate(['/login'])
  // }
}
