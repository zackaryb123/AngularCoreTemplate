import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {FirestoreService} from '../../store/firestore/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  $cases: Observable<any>;

  constructor(
    private firestore: FirestoreService
  ) {
    this.$cases = this.firestore.$cases;
  }
}
