import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product.model';

import { pluck } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public getAllProducts() {
    return this.http
      .get('https://waf-app.herokuapp.com/api/v1/products')
      .pipe(pluck('data', 'products'));
  }

  public getProduct(id: string) {
    return this.http.get<Product>(
      'https://waf-app.herokuapp.com/api/v1/products'
    );
  }

  public createProduct(product: Product) {
    return this.http
      .post('https://waf-app.herokuapp.com/api/v1/products', product)
      .pipe(pluck('product'));
  }
}
