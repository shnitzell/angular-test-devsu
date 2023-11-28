import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { environment } from '../../environments/environment';
import { ProductType } from '../../models/shared-models';

@Injectable({
  providedIn: 'root',
})
export class DashboardService extends ApiService {
  private apiURL = `${environment.baseURL}`;

  constructor(private http: HttpClient) {
    super(http);
  }

  checkIdvalidity(productId: string) {
    const headers = {
      authorId: environment.authorId,
    };
    return this.requestToAPI<ProductType[]>(
      `${this.apiURL}/bp/products/verification?id=${productId}`,
      {
        headers: headers,
        method: 'GET',
        shouldLoad: false,
        shouldShowError: false,
      }
    );
  }

  addProduct(product: ProductType) {
    const headers = {
      authorId: environment.authorId,
    };
    return this.requestToAPI<ProductType[]>(`${this.apiURL}/bp/products`, {
      headers: headers,
      method: 'POST',
      body: product,
      shouldLoad: false,
      shouldShowError: false,
    });
  }

  editProduct(product: ProductType) {
    const headers = {
      authorId: environment.authorId,
    };
    return this.requestToAPI<ProductType[]>(`${this.apiURL}/bp/products`, {
      headers: headers,
      method: 'PUT',
      body: product,
      shouldLoad: false,
      shouldShowError: false,
    });
  }

  getProducts() {
    const headers = {
      authorId: environment.authorId,
    };
    return this.requestToAPI<ProductType[]>(`${this.apiURL}/bp/products`, {
      headers: headers,
      method: 'GET',
      shouldLoad: false,
      shouldShowError: false,
    });
  }

  delProduct(productId: string) {
    const headers = {
      authorId: environment.authorId,
    };
    return this.requestToAPI<ProductType[]>(
      `${this.apiURL}/bp/products?id=${productId}`,
      {
        headers: headers,
        method: 'DELETE',
        shouldLoad: false,
        shouldShowError: false,
      }
    );
  }
}
