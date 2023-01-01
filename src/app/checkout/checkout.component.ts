import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, order } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  totalPrice: number | undefined;
  carData:cart[]|undefined;
  orderMsg:string|undefined;
  constructor(private product: ProductService,private router:Router) {}

  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {
      this.carData=result
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.productPrice * item.quantity);
        }
      });
      this.totalPrice = price + price / 5 + (price ? 100 : 0) - price / 10;
    });
  }
  orderNow(data: order) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user)[0].id;
    if (this.totalPrice) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
      };
      this.carData?.forEach((item)=>{
        setTimeout(() => {
         item.id && this.product.deleteCartItems(item.id)
        }, 800);
      })
      this.product.orderNow(orderData).subscribe((result)=>{
        this.orderMsg ="Your Order has been Succsefully Placed"
       setTimeout(() => {
        this.router.navigate(['/my-orders'])
        this.orderMsg = undefined
       }, 3000);
      })
    }
  }
}


