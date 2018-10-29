import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { OccModuleConfig } from '@spartacus/core';

@Injectable()
export class OccSiteService {
  constructor(private http: HttpClient, private config: OccModuleConfig) {}

  protected getBaseEndPoint() {
    return (
      (this.config.server.baseUrl || '') +
      this.config.server.occPrefix +
      this.config.site.baseSite
    );
  }

  loadLanguages(): Observable<any> {
    return this.http
      .get(this.getBaseEndPoint() + '/languages')
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  loadCurrencies(): Observable<any> {
    return this.http
      .get(this.getBaseEndPoint() + '/currencies')
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
