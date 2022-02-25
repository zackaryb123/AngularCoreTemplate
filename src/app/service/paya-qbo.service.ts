import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConstants} from '../constants';

@Injectable({
  providedIn: 'root'
})
export class PayaQboService {

  constructor(private _httpClient: HttpClient) { }

  boardUser (formData) {
    const headers = this.getBaseHeaders();
    return this._httpClient.post(AppConstants.PAYA_QBO_BOARD, formData, {headers}).toPromise();
  }

  getBaseHeaders() {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    return headers;
  }
}
