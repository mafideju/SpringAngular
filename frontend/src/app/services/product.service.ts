import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../shared/product';
import { ProductCategory } from '../shared/product-category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getProductList(): Observable<Product[]> {
    return this.http
      .get<GetResponseProducts>(`${this.baseUrl}/products`)
      .pipe(map((resp) => resp._embedded.products));
  }

  getProductListByCategoryId(id: number): Observable<Product[]> {
    return this.http
      .get<GetResponseProducts>(`${this.baseUrl}/products/search/findByCategoryId?id=${id}`)
      .pipe(map((resp) => resp._embedded.products));
  }

  getProductCategoriesService(): Observable<ProductCategory[]> {
    return this.http
      .get<GetResponseProductCategory>(`${this.baseUrl}/product-category`)
      .pipe(map((resp) => resp._embedded.productCategory));
  }

  getByProductIdService(prodId: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/products/${prodId}`;
    return this.http.get<Product>(productUrl);
  }

  getProductListPaginateService(page: number, pagesize: number, categoryId: number): Observable<GetResponseProducts> {
    const paginateUrl = `${this.baseUrl}/products/search/findByCategoryId?id=${categoryId}&page=${page}&size=${pagesize}`;
    return this.http.get<GetResponseProducts>(paginateUrl);
  }

  // searchProductService(keyword: string): Observable<Product[]> {
  //   const searchUrl = `${this.baseUrl}/products/search/findByNameContaining?name=${keyword}`;
  //   return this.http
  //     .get<GetResponseProducts>(searchUrl)
  //     .pipe(map((resp) => resp._embedded.products));
  // }

  searchProductPaginateService(page: number, pagesize: number, keyword: string): Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}/products/search/findByNameContaining?name=${keyword}&page=${page}&size=${pagesize}`;
    return this.http
      .get<GetResponseProducts>(searchUrl);
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  };
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
