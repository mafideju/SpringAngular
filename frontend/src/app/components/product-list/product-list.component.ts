import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/shared/product';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  products: Product[];
  displayedColumns: string[] = ['Imagem', 'Produto', 'Preço', 'Estoque', 'Carrinho'];
  dataSource = this.products;
  catId: number;
  currentId: number;
  currentCatName: string;
  keyword: string;
  searchMode: boolean;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    // this.dataSource.paginator = this.paginator;
    this.handleProductsScreening();

    // SUBSCRIBE PARA PEGAR VALORES VIA ROUTER
    this.route.paramMap.subscribe(() => {
      this.handleProductsScreening();
    });
  }

  handleProductsScreening() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    this.searchMode ? this.searchProduct() : this.getProductList();
  }

  getProductList() {

    if (this.route.snapshot.paramMap.has("id")) {
      this.currentId = +this.route.snapshot.paramMap.get("id");
      this.currentCatName = this.route.snapshot.paramMap.get("name");
    } else {
      this.currentCatName = 'Books';
      this.currentId = 1;
    }

    this.productService.getProductListByCategoryId(this.currentId).subscribe(resp => {
      this.products = resp;
    });

  }

  searchProduct() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword');

    this.productService.searchProductService(keyword).subscribe(resp => {
      this.products = resp;
    });
  }

}
