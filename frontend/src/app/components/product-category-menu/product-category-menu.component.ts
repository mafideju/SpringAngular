import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../shared/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.scss']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories: ProductCategory[];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProductCategories();
  }

  getProductCategories() {
    this.productService.getProductCategoriesService().subscribe((resp: ProductCategory[]) => {
      this.productCategories = resp;
    });
  }

}
