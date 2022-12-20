import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'],
})
export class SellerAddProductComponent implements OnInit {
  addProductMessage: undefined | string;

  constructor(private product: ProductService, private router: Router) {}

  ngOnInit(): void {}

  submit(data: product) {
    this.product.addProduct(data).subscribe((result) => {
      if (result) {
        this.addProductMessage = 'Product is Successfully added';
      }
      setTimeout(() => {
        this.addProductMessage = undefined;
        this.router.navigate(['seller-home']);
      }, 1000);
    });
  }
}
