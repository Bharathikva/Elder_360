import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: any;

  constructor( private cookie:CookieService){}

  ngOnInit() {
    this.username = this.cookie.get('username');
  }

  logout(){
    this.cookie.delete('username');
    this.cookie.deleteAll;
    this.cookie.delete('access_token');
    this.cookie.delete('refresh_token');
  }
}