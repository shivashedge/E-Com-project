import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | product[];
  productDeleted: undefined | string;
  delete = faTrash;
  edit = faEdit;
  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.productListDisplay();
  }
  productListDisplay() {
    this.product.productList().subscribe((result) => {
      if (result) {
        this.productList = result;
      }
    });
  }
  deleteProductAction(id: number) {
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productDeleted = 'Product Deleted';
        this.productListDisplay();
      }
    });
    setTimeout(() => {
      this.productDeleted = undefined;
    }, 2000);
  }
}
