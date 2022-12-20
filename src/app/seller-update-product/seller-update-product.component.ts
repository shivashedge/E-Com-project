import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css'],
})
export class SellerUpdateProductComponent implements OnInit {
  updateProductMessage: undefined | string;
  productData: undefined | product;
  constructor(
    private route: ActivatedRoute,
    private product: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');

    productId &&
      this.product.getProduct(productId).subscribe((data) => {
        this.productData = data;
      });
  }
  submit(data: product) {
    if (this.productData) {
      data.id = this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result) => {
      if (result) {
        this.updateProductMessage = 'Product Updated';
      }
    });
    setTimeout(() => {
      this.updateProductMessage = undefined;
      this.router.navigate(['seller-home']);
    }, 1000);
  }
}
