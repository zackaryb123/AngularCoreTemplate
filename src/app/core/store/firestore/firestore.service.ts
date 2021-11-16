import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  $cases: Observable<any>;

  constructor(
    private fireAuth: AngularFireAuth,
    private  fireStore: AngularFirestore
  ) {
    this.watchCases();
  }

  watchCases() {
    this.$cases = this.fireAuth.user.pipe(
      switchMap( (auth) => {
        if (auth) {
          return this.fireStore.collection<any>(
            'cases',
            ref => ref.limit(80).orderBy('timestamp', 'desc'))
            .valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  addCase() {
    const caseDoc = this.fireStore.collection('cases').doc();
    return caseDoc.set(
      {
        id: caseDoc.ref.id,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        new: 'new'
      }
    );
  }
}
