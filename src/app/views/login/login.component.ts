import {AfterContentChecked, AfterContentInit, AfterViewChecked, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {AppConstants} from '../../constants';
import {Router} from '@angular/router';
import {CollapseDirective} from 'ngx-bootstrap/collapse';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements AfterViewChecked {
  private _isCollapsed: boolean = true;
  collapseRef;
  @ViewChild(CollapseDirective, { read: ElementRef, static: false }) collapse !: CollapseDirective;

  constructor(
    private _router: Router,
    private renderer: Renderer2,

  ) {
  }

  ngAfterViewChecked (): void {
    this.collapseRef = this.collapse;
  }

  set isCollapsed(value) {
    this._isCollapsed = value;
  }
  get isCollapsed() {
    if (this.collapseRef) {
      // temp fix for "overflow: hidden"
      if (getComputedStyle(this.collapseRef.nativeElement).getPropertyValue('display') === 'flex') {
        this.renderer.removeStyle(this.collapseRef.nativeElement, 'overflow');
      }
    }
    return this._isCollapsed;
  }

  launchPopup() {
    let parameters = 'location=1,width=800,height=650';
    parameters += ',left=' + (screen.width - 800) / 2 + ',top=' + (screen.height - 650) / 2;
    // Launch Popup
    window.open(AppConstants.PAYA_QBO_CONNECT, 'connectPopup', parameters);
  }
}
