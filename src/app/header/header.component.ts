import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName : string = ''
  constructor(private route: Router) {}

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = 'seller';
          if(localStorage.getItem('seller')){
            let sellerStore:any = localStorage.getItem('seller');
            
            let sellerData = JSON.parse(sellerStore)[0];
            this.sellerName = "Hello " + sellerData.fName;
          }
        } else {
          this.menuType = 'default';
        }
      }
    });
  }

  logOut(){
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
}
