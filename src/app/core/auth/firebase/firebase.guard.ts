import {Injectable, NgZone} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseGuard implements CanActivate {

  constructor(
    private fireAuth: AngularFireAuth,
    private ngZone: NgZone,
    private router: Router,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {
      this.fireAuth.onAuthStateChanged(auth => {
        console.log('canActivate: onAuthStateChanged: success: ', auth);
        if (auth) {
          resolve(true);
        } else {
          return this.ngZone.run(() => this.router.navigate(['/login']));
        }
      }).catch(error => {
        console.log('canActivate: onAuthStateChanged: fail: ', error);
        reject(false);
      });
    });
  }
}
