import {Component, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {AppConstants} from '../../constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {

  constructor(private _router: Router,
              @Inject(DOCUMENT) private document: Document
  ) { }

  redirectPayaLogin() {
    this.document.location.href = AppConstants.PAYA_REDIRECT;
  }
}
