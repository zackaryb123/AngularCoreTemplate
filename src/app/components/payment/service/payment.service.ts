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
  headers = new HttpHeaders({
    // 'Content-Type': 'form-data',
    // 'Accept': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*'
  });

  constructor(
    private http: HttpClient,
  ) { }

  watchInvoices() {
    // this.userGameClips$ = this.afAuth.user.pipe(
    //   switchMap( (auth) => {
    //     if (auth) {
    //       return this.afStore.doc<any>(`users/${auth.uid}`).collection('clips').valueChanges();
    //     } else {
    //       return of(null);
    //     }
    //   })
    // );
  }

  private postFormData(type, formData: FormData) {
    const headers = new HttpHeaders({
      // 'Content-Type': 'form-data',
      // 'Accept': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*'
    });
    console.log('Post form data : ' + CONSTANT.PAYMENT_API[type] + ' : ' + formData);
    headers.set('mimeType', 'multipart/form-data');
    headers.append('tackon', 'test');
    console.log(headers);
    return this.http.post(
      `${environment.paymentApiBaseUrl + CONSTANT.PAYMENT_API[type]}/test`,
      formData,
      {headers: headers});
  }

  postCardFile(file) {
    const data = new FormData();
    data.append('file', file);
    return this.postFormData('UPLOAD_FILE', data);
    // console.log('clipsArr: ', file);
    // return this.http.post(`${environment.paymentApiBaseUrl}${CONSTANT.PAYMENT_API.UPLOAD_FILE}/${URIS.USER_GAME_CLIPS}`, JSON.stringify(clipsArr), {headers: this.headers}).toPromise()
    //   .then((res: any) => {
    //     return res;
    //   }, err => {
    //     console.log(err);
    //   }).catch(err => {
    //     console.log(err);
    //   });
  }

  linkXboxAccount(values: any) {
    // const JsonData = JSON.stringify(values);
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Access-Control-Allow-Origin': '*'
    // });
    // return this.http.post(`${BASE_URI}/${URIS.XBOX_LINK_ACCOUNT}`, JsonData, {headers}).toPromise().then((data: any) => {
    //   console.log(data);
    //   return data;
    // }, (err) => {
    //   console.log('ON REJECT ERROR: ', err);
    //   return err;
    // }).catch(err => {
    //   console.log('CATCH ERROR: ', err);
    //   return err;
    // });
  }
}
