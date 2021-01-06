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
    return this.http
      .get<Product>(`https://waf-app.herokuapp.com/api/v1/products/${id}`)
      .pipe(pluck('data', 'product'));
  }

  public updateProduct(id: string, product: Product) {
    return this.http
      .patch<Product>(
        `https://waf-app.herokuapp.com/api/v1/products/${id}`,
        product
      )
      .pipe(pluck('data', 'document'));
  }

  public deleteProduct(id: string) {
    return this.http.delete<Product>(
      `https://waf-app.herokuapp.com/api/v1/products/${id}`
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

  public getOrder(id: string) {
    return this.http
      .get<OrderResponse>(`https://waf-app.herokuapp.com/api/v1/orders/${id}`)
      .pipe(pluck('data', 'order'));
  }

  public processOrder(id: string, changes) {
    return this.http
      .patch<OrderResponse>(
        `https://waf-app.herokuapp.com/api/v1/orders/${id}`,
        {
          ...changes,
        }
      )
      .pipe(pluck('data', 'order'));
  }

  public deleteOrder(id: string) {
    return this.http.delete<OrderResponse>(
      `https://waf-app.herokuapp.com/api/v1/orders/${id}`
    );
  }
}
