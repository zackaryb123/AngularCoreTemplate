import {Component, OnDestroy, OnInit} from '@angular/core';
import { navItems } from '../../_nav';
import {AppService} from '../../core/service/app/app.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {FirebaseService} from '../../core/auth/firebase/firebase.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss']
})
export class MainAppComponent implements OnInit, OnDestroy {
  public sidebarMinimized = false;
  public navItems = navItems;
  $unsubscribe: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _dataService: AppService,
    private _authService: FirebaseService
  ) {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.$unsubscribe.next(true);
    this.$unsubscribe.complete();
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  doLogout() {
    return this._authService.doLogout();
  }
}
