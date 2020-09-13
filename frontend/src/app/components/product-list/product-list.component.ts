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

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    // this.dataSource.paginator = this.paginator;
    this.getProductList();
    this.route.paramMap.subscribe(() => {
      this.getProductList();
    });
  }

  getProductList() {
    const hasCatId: boolean = this.route.snapshot.paramMap.has("id");
    hasCatId ? this.currentId = +this.route.snapshot.paramMap.get("id") : this.currentId = 1 ;

    console.log('this.currentId :>> ', this.currentId);

    this.productService.getProductListById(this.currentId).subscribe(resp => {
      console.log('productService.getProductListById :>> ', resp);
      this.products = resp;
    });

  }

}
