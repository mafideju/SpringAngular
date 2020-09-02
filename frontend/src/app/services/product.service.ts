import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../shared/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products?size=100';

  constructor(private http: HttpClient) { }

  getProductList(): Observable<Product[]> {
    return this.http.get<GetResponse>(this.baseUrl).pipe(
      map(resp => resp._embedded.products)
    );
  }
}


interface GetResponse {
  _embedded: {
    products: Product[]
  }
}
