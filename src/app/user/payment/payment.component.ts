import { Component } from '@angular/core';
import { PaymentService } from 'src/app/core/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  
  constructor(private paymentService: PaymentService) {}

 

  makePayment() {
    const orderdetails = {
      amount: "100",
    currency: "INR",
    customer: "srdar"
   
    }
    this.paymentService.openCheckout(orderdetails).subscribe((response: any) => {
      console.log(response);
      // Handle success or failure
    });
  }
}
