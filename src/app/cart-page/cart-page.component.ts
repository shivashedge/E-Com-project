import { Component, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  delete = faTrash;
  cartList=[
    {"productName": "Killer Jeans",
    "productPrice": "4000",
    "productColor": "Blue",
    "productCategory": "Clothing",
    "productDescription": "Killer Jeans",
    "productImgURL": "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzB8fGtpbGxlciUyMGplYW5zfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "quantity": 1,
    "userId": 1,
    "productId": 1,
    "id": 1}
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
