import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Case} from '../../../shared/interface/cases.interface';
import {AppService} from '../../../core/service/app/app.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})
export class CasesComponent implements OnInit, OnDestroy {
  $cases: Observable<Case[]>;

  $unsubscribe: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _appService: AppService
  ) { }

  ngOnInit(): void {
    this.$cases = this._appService.$cases
      .pipe(takeUntil(this.$unsubscribe));
  }

  ngOnDestroy(): void {
    this.$unsubscribe.next(true);
    this.$unsubscribe.complete();
  }


}
