import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/shared/product';
import { MatPaginator } from '@angular/material/paginator';

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

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    // this.dataSource.paginator = this.paginator;
    this.getProductList();
  }

  getProductList() {
    this.productService.getProductList().subscribe(resp => {
      console.log('productService.getProductList :>> ', resp);
      this.products = resp;
    });
  }

}
