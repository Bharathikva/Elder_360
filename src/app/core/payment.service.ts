import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

declare var Razorpay: any;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private razorpayOptions: any;
  private razorpay: any;
  private orderId!: string;

  constructor(private http: HttpClient, private api: ApiService) {
    this.razorpay = new Razorpay({
      key: 'rzp_test_6NKMSxNWLW1ph9',
      image: 'https://yourcompany.com/logo.png'
    });
  }

  createOrder(amount: any): Observable<any> {
    const url = 'http://localhost:8080/orders/pay';
    const payload = amount ;
    
    return this.http.post(url, payload);
  }

  openCheckout(amount:any): Observable<any> {
    return new Observable(observer => {
      this.createOrder(amount).subscribe((order: any) => {
        this.orderId = order.id;
        
        this.razorpayOptions = {
          key: 'rzp_test_6NKMSxNWLW1ph9',
          amount: amount * 100,
          currency: 'INR',
          name: 'Your Company Name',
          description: 'Payment for products',
          image: 'https://yourcompany.com/logo.png',
          order_id: this.orderId,
          handler: (response: any) => {
            observer.next(response);
          },
          prefill: {
            name: 'John Doe',
            email: 'johndoe@example.com',
            phone: '9876543210'
          },
          notes: {
            address: 'Your Company Address'
          },
          theme: {
            color: '#F37254'
          }
        };

        this.razorpay.open(this.razorpayOptions);
      });
    });
  }
}
