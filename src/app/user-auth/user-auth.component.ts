import { Component, OnInit } from '@angular/core';
import { cart, login, product, SignUp } from '../data-type';
import { ProductService } from '../services/product.service';
import {} from '../services/seller.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  showLogin = false;
  authError = '';
  constructor(private user: UserService, private product: ProductService) {}

  ngOnInit(): void {
    this.user.userAuthReload();
  }
  signUp(data: SignUp): void {
    this.user.userSignUp(data);
  }
  userlogin(data: login) {
    this.authError = '';
    this.user.userLogin(data);
    this.user.isLoginError.subscribe((result) => {
      if (result) {
        this.authError = 'Email or Password is Incorrect';
      } else {
        this.localCartToRemoteCart();
      }
    });
  }
  openLogin() {
    this.showLogin = false;
  }
  openSignUp() {
    this.showLogin = true;
  }
  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user)[0].id;
    if (data) {
      let cartDetails: product[] = JSON.parse(data);
      cartDetails.forEach((product: product, index: number) => {
        let cartData: cart = {
          ...product,
          userId,
          productId: product.id,
        };
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result) => {
            if (result) {
              alert('Cart Updated');
            }
          });
          if (cartDetails.length === index + 1) {
            localStorage.removeItem('localCart');
          }
        }, 500);
      });
    }
    setTimeout(() => {
      this.product.getCartList(userId);
    }, 2000);
  }
}
