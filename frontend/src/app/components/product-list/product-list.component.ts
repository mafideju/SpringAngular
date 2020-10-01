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
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  products: Product[] = [];
  displayedColumns: string[] = ['Imagem', 'Produto', 'Preço', 'Estoque', 'Carrinho'];
  dataSource: Product[] = this.products;
  previousId: number = 1;
  currentId: number = 1;
  currentCatName: string;
  keyword: string;
  searchMode: boolean;
  // PAGINATION
  pageNumber: number = 0;
  pageSize: number = 5;
  categoryId: number = 10;
  totalElements: number;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    // this.dataSource.paginator = this.paginator;
    console.log('this.dataSource :>> ', this.dataSource);
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
    const hasId: boolean = this.route.snapshot.paramMap.has("id");

    if (hasId) {
      this.currentId = +this.route.snapshot.paramMap.get("id");
      this.currentCatName = this.route.snapshot.paramMap.get("name");
    } else {
      this.currentCatName = 'Books';
      this.currentId = 1;
    }

    this.previousId != this.currentId ? this.pageNumber = 1 : this.previousId = this.currentId;

    this.productService.getProductListPaginateService(
      this.pageNumber - 1,
      this.pageSize,
      this.currentId
    ).subscribe(resp => {
      this.processResult(resp);
    });
  }

  processResult(resp: any) {
    console.warn('processResult :>> ', resp);
    this.products = resp._embedded.products;
    this.pageSize = resp.page.size;
    this.pageNumber = resp.page.number + 1;
    this.totalElements = resp.page.totalElements;
    // this.currentId = resp.page.currentId;
  }

  handlePage(event: any) {
    console.log('handlePage.event :>> ', event);
    this.pageSize = event.pageSize;
    this.pageNumber = 1;
    this.getProductList();
  }

  searchProduct() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword');

    this.productService.searchProductPaginateService(
      this.pageNumber - 1,
      this.pageSize,
      keyword
    ).subscribe(resp => {
      console.log('searchProduct.resp :>> ', resp);
      this.processResult(resp);
    });
  }
}
