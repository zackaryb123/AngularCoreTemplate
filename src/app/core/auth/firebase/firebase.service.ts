import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  $authUser: Observable<any>;

  constructor(
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
  ) { }

  watchAuthUser() {
    this.$authUser = this.fireAuth.user.pipe(
      switchMap( (auth) => {
        if (auth) {
          return this.fireStore.collection('users').doc(auth.uid).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  AuthLogin(provider) {
    return this.fireAuth.signInWithPopup(provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        return result.credential;
      }).catch((error) => {
        // Handle Errors here.
        return error;
      });
  }

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          this.createUser(res, value);
          resolve(res);
        }, err => reject(err));
    });
  }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.signInWithEmailAndPassword(value.email, value.password)
        // firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(async res => {
          const user = await this.fireStore.collection('users').doc(res.user.uid).get();
          console.log('user: ', user);
          resolve(res);
        }, err => reject(err));
    });
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      this.fireAuth.signOut().then(data => {
        resolve(data);
      }).catch(error => {
        console.log('doLogout: fail: ', error);
        reject(error);
      });
    });
  }

  createUser(data, value?) {
    const newUserRef = this.fireStore.collection('users').doc(data.user.uid);
    newUserRef.get().toPromise().then(user => {
      return this.fireStore.collection('users').doc(data.user.uid).set({
        avatar: 'https://firebasestorage.googleapis.com/v0/b/gamesocial-zb.appspot.com/o/avatar.jpg?alt=media&token=a63d8d23-041c-4021-bb68-742bd0a95160',
        bio: '',
        name: value.name,
        uid: data.user.uid,
        provider: data.additionalUserInfo.providerId,
        email: value.email
      });
    });
  }
}
