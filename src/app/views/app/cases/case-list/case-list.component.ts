import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {map, mergeMap, scan, takeUntil, tap, throttleTime} from 'rxjs/operators';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {AppService} from '../../../../core/service/app/app.service';
import {AngularFirestore} from '@angular/fire/firestore';
import ResizeObserver from 'resize-observer-polyfill';
import {FirestoreService} from '../../../../core/store/firestore/firestore.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaseListComponent implements OnInit, OnDestroy {
  $unsubscribe: Subject<boolean> = new Subject<boolean>();
  // infinite scroll
  startId = '';
  theEnd = false;
  offset = new BehaviorSubject(null);
  infinite: Observable<any[]>;
  itemSize = 110;
  batchSize = 20;
  initResize = false;
  sizeObserver: ResizeObserver;
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  detectResizeCaseElem;

  constructor(
    private _appService: AppService,
    private _firestore: AngularFirestore,
    private firestoreService: FirestoreService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    const batchMap = this.offset.pipe(
      throttleTime(500),
      mergeMap(n => this.getBatch(n)),
      scan((acc, batch) => {
        return {...acc, ...batch};
      }, {})
    );
    this.infinite = batchMap.pipe(map(v => Object.values(v)));
  }

  ngOnDestroy(): void {
    this.$unsubscribe.next(true);
    this.$unsubscribe.complete();
    this.sizeObserver.unobserve(this.detectResizeCaseElem);
  }

  checkResize() {
    const cdkScrollElem = document.getElementById('case-item-1');
    if (!this.initResize && cdkScrollElem) {
      this.detectResizeCaseElem = cdkScrollElem;
      // Observe Height of item on resize
       this.sizeObserver = new ResizeObserver(entries => {
        entries.forEach(entry => {
          this.itemSize = entry.contentRect.height;
          if (this.viewport) {
            this.viewport.checkViewportSize();
          }
        });
      });
      this.sizeObserver.observe(this.detectResizeCaseElem);
    }
    this.initResize = true;
  }

  tracByIdx(i) {
    return i;
  }

  getBatch(lastSeen: string) {
    return this._firestore.collection(
      'cases',
      ref => ref
        .orderBy('id')
        .orderBy('timestamp')
        .startAfter(lastSeen)
        .limit(this.batchSize)
    )
      .snapshotChanges()
      .pipe(
        tap(arr => (arr.length ? null : (this.theEnd = true))), // set theEnd to true if array is empty
        map(arr => {
          return arr.reduce((acc, cur) => {
            const id = cur.payload.doc.id;
            const data = cur.payload.doc.data();
            return {...acc, [id]: data};
          }, {});
        })
      );
  }

  getNextBatch(event, offset) {
    if (this.theEnd) {
      return;
    }
    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();

    if (end === total) {
      this.offset.next(offset);
    }
  }

}
