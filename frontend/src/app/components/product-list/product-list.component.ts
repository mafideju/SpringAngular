import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/shared/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    console.log('productService :>> ', this.productService);
    this.getProductList();
  }

  getProductList() {
    this.productService.getProductList().subscribe(resp => {
      this.products = resp;
    });
  }

}
