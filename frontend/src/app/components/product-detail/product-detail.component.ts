import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/shared/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.getByProductId();
    });
  }

  getByProductId() {
    const prodId: number = +this.route.snapshot.paramMap.get('id');

    this.productService.getByProductIdService(prodId).subscribe((resp) => {
      this.product = resp;
    });
  }

}
