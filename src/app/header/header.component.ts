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
  searchResult: undefined | product[];
  constructor(private route: Router, private product: ProductService) {}

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = 'seller';
          if (localStorage.getItem('seller')) {
            let sellerStore: any = localStorage.getItem('seller');

            let sellerData = JSON.parse(sellerStore)[0];
            this.sellerName = 'Hello ' + sellerData.fName;
          }
        } else {
          this.menuType = 'default';
        }
      }
    });
  }

  logOut() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
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
  submitSearch(val: string) {
    // console.warn(val);
    this.route.navigate([`search/${val}`]);
  }
}
