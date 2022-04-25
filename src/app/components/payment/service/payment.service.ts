import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CONSTANT} from '../constant';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  invoices$: Observable<any>;

  constructor(
    private http: HttpClient,
  ) { }

  watchInvoices() {}

  private postFormData(type, formData: FormData, queryString) {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'mimeType': 'multipart/form-data'
    });
    headers.set('mimeType', 'multipart/form-data');
    return this.http.post(
      `${environment.paymentApiBaseUrl + CONSTANT.PAYMENT_API[type]}/${queryString}`,
      formData,
      {headers: headers});
  }

  postCardFile(file) {
    const data = new FormData();
    data.append('file', file);
    return this.postFormData('UPLOAD_FILE', data, 'test');
  }
}
