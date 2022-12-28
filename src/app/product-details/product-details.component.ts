import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cart, product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productDetails: undefined | product;
  productQuantity: number = 1;
  removeCart = false;
  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductService
  ) {}

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    productId &&
      this.product.getProduct(productId).subscribe((result) => {
        this.productDetails = result;
      });
    let cartData = localStorage.getItem('localCart');
    if (productId && cartData) {
      let items = JSON.parse(cartData);
      items = items.filter((item: product) => productId == item.id.toString());
      if (items.length) {
        this.removeCart = true;
      } else {
        this.removeCart = false;
      }
    }
    let user = localStorage.getItem('user');
    if (user) {
      let userId = user && JSON.parse(user)[0].id;
      this.product.getCartList(userId);
      this.product.cartData.subscribe((result) => {
        // console.warn('result', result);
        let item = result.filter((item: any) =>item.productId == productId);
        if (item.length) {
          this.removeCart = true;
        }
      });
    }
  }
  handleQuantity(val: string) {
    if (this.productQuantity < 10 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }
  addToCart() {
    if (this.productDetails) {
      this.productDetails.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        // console.warn(this.productDetails);
        this.product.localAddToCart(this.productDetails);
        this.removeCart = true;
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user)[0].id;
        let cartData: cart = {
          ...this.productDetails,
          userId,
          productId: this.productDetails.id,
        };
        delete cartData.id;
        // console.warn('cartData', cartData);
        this.product.addToCart(cartData).subscribe((result) => {
          this.product.getCartList(userId);
          this.removeCart = true;
        });
      }
    }
  }
  removeFromCart(id: number) {
    this.product.removeItemFromCart(id);
    this.removeCart = true;
  }
}
