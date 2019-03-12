import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Product, ReviewList, Review } from '../../occ/occ-models/occ.models';
import { OccProductConfig } from './product-config';

const ENDPOINT_PRODUCT = 'products';

@Injectable()
export class OccProductService {
  constructor(private http: HttpClient, private config: OccProductConfig) {}

  protected getProductEndpoint(): string {
    return (
      (this.config.server.baseUrl || '') +
      this.config.server.occPrefix +
      this.config.site.baseSite +
      '/' +
      ENDPOINT_PRODUCT
    );
  }

  loadProduct(productCode: string): Observable<Product> {
    const params = new HttpParams({
      fromString: this.config.occProduct.loadProduct.join(',')
    });

    return this.http
      .get(this.getProductEndpoint() + `/${productCode}`, { params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  loadProductReviews(
    productCode: string,
    maxCount?: number
  ): Observable<ReviewList> {
    const params = new HttpParams({
      fromString: this.config.occProduct.loadProductReviews.join(',')
    });
    let url = this.getProductEndpoint() + `/${productCode}/reviews`;
    if (maxCount && maxCount > 0) {
      url += `?maxCount=${maxCount}`;
    }

    return this.http
      .get(url, { params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  public postProductReview(
    productCode: String,
    review: any
  ): Observable<Review> {
    const url = this.getProductEndpoint() + `/${productCode}/reviews`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    body.append('headline', review.headline);
    body.append('comment', review.comment);
    body.append('rating', review.rating.toString());
    body.append('alias', review.alias);

    return this.http
      .post(url, body.toString(), { headers })
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
