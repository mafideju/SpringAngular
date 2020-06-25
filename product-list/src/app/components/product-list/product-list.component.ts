import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/commom/product';

import { faCode } from '@fortawesome/free-solid-svg-icons';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  faCode = faCode;
  faCameraRetro = faCameraRetro;
  faMoneyBill = faMoneyBill;
  faList = faList;

  products: Product[];
  currentCatId: number;
  currentCatName: string;
  searchMode: boolean;
  keyword: string = this.route.snapshot.paramMap.get('keyword');

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleListProducts() {
    const hasCatId: boolean = this.route.snapshot.paramMap.has('id');
    console.log('this.route', this.route);

    if (hasCatId) {
      this.currentCatId = +this.route.snapshot.paramMap.get('id');
      this.currentCatName = this.route.snapshot.paramMap.get('name');
    } else {
      this.currentCatId = 1;
      this.currentCatName = 'Books';
    }

    this.productService.getProductList(this.currentCatId).subscribe(response => {
      this.products = response;
    });
  }

  handleSearchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword');

    this.productService.searchProducts(keyword).subscribe(response => {
      this.products = response;
    });
  }

}
