import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product.model';

import { map, pluck } from 'rxjs/operators';
import { OrderResponse } from './orderResponse';
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

  public getOrders() {
    return this.http
      .get<OrderResponse>('https://waf-app.herokuapp.com/api/v1/orders')
      .pipe(pluck('data', 'orders'));
  }
}
