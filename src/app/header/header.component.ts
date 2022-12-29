import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = '';
  userName: string = '';
  searchResult: undefined | product[];
  cartItems = 0;

  constructor(private route: Router, private product: ProductService) {}

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          if (localStorage.getItem('seller')) {
            let sellerStore: any = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = 'Hello ' + sellerData.fName;
            this.menuType = 'seller';
          }
        } else if (localStorage.getItem('user')) {
          let userStore: any = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore)[0];
          this.userName = 'Hello ' + userData.fName;
          this.menuType = 'user';
          this.product.getCartList(userData.id)
        } else {
          this.menuType = 'default';
        }
      }
    });
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length;
    }
    this.product.cartData.subscribe((items) => {
      this.cartItems = items.length;
    });
  }

  logOut() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
  userLogOut() {
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
    this.product.cartData.emit([]);
  }
  searchProduct(querry: KeyboardEvent) {
    if (querry) {
      const element = querry.target as HTMLInputElement;
      // console.warn(element.value);
      this.product.searchProducts(element.value).subscribe((result) => {
        // console.warn(result);
        if (result.length > 5) {
          result.length = 5;
        }
        this.searchResult = result;
      });
    }
  }
  hideSearch() {
    this.searchResult = undefined;
  }
  redirecToDetails(id: number) {
    this.route.navigate([`details/${id}`]);
  }
  submitSearch(val: string) {
    // console.warn(val);
    this.route.navigate([`search/${val}`]);
  }
}
