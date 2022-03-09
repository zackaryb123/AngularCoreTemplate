import { Component } from '@angular/core';
import {AppConstants} from '../../constants';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {

  constructor(
    private _router: Router
  ) {
  }

  launchPopup() {
    let parameters = 'location=1,width=800,height=650';
    parameters += ',left=' + (screen.width - 800) / 2 + ',top=' + (screen.height - 650) / 2;
    // Launch Popup
    window.open(AppConstants.PAYA_QBO_CONNECT, 'connectPopup', parameters);
  }
}
