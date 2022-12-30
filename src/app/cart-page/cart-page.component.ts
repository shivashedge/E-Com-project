import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { cart, priceSummary } from '../data-type';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  delete = faTrash;
  cartList:cart[]|undefined
  priceSummary:priceSummary={
    cartAmount:0,
    discount:0,
    tax:0,
    delivary:0,
    total:0
  }
  constructor(private product:ProductService) { }

  ngOnInit(): void {
    this.product.currentCart().subscribe((result)=>{
      this.cartList = result;
      let price = 0;
      result.forEach((item)=>{
        if(item.quantity){
          price = price + (+item.productPrice * item.quantity)
        }
      })
      this.priceSummary.cartAmount=price;
      this.priceSummary.discount=(price/10);
      this.priceSummary.tax=(price/5);
      this.priceSummary.delivary= price?100:0
      this.priceSummary.total= (this.priceSummary.cartAmount+this.priceSummary.tax+this.priceSummary.delivary)-this.priceSummary.discount
      
    })
  }

}
