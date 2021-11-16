import {Injectable, NgZone} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import {Observable, Subject} from 'rxjs';
import firebase from 'firebase';
import User = firebase.User;


@Injectable()
export class FirebaseResolver implements Resolve<User> {
  constructor(
    public fireAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,

  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Promise<User> {
    return new Promise((resolve, reject) => {
      this.fireAuth.onAuthStateChanged(auth => {
        console.log('resolve: onAuthStateChanged: success:  ', auth);
        if (auth) {
          return this.ngZone.run(() => this.router.navigate(['/']));
        }
        resolve(auth);
      }).catch(error => {
        console.log('resolve: onAuthStateChanged: fail: ', error);
        reject(error);
      });
    });
  }
}
