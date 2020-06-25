import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/commom/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product = new Product();

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleGetProductById();
    });
  }

  handleGetProductById() {
    const productId: number = +this.route.snapshot.paramMap.get('id');

    this.productService.getProductById(productId).subscribe(response => {
      this.product = response;
    });
  }

}
