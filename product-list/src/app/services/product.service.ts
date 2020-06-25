import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../commom/product';
import { ProductCategory } from '../commom/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';
  private catUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  getProductList(catId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${catId}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductById(id: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/${id}`;

    return this.httpClient.get<Product>(productUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponseProductCategory>(this.catUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  searchProducts(keyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[]
  };
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[]
  };
}
