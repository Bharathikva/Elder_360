import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  message1:any;
  constructor( private http: ApiService) { }

  myclick(){
    this.http.hello()
    .subscribe(data=>{
      this.message1=data.message;
      console.log(data.message);
      
    })
  }

}
