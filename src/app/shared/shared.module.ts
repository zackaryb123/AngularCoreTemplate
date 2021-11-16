import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import {CdkScrollableModule, ScrollingModule} from '@angular/cdk/scrolling';
import { FirebaseTimestampPipe } from './pipe/firebase-timestamp.pipe';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {NgbNavModule} from '@ng-bootstrap/ng-bootstrap';
import { CaseArticleComponent } from './component/case-article/case-article.component';
import { VictimCardComponent } from './component/victim-card/victim-card.component';
import { SuspectsListComponent } from './component/suspects-list/suspects-list.component';
import { WitnessListComponent } from './component/witness-list/witness-list.component';
import { SolveCaseFormComponent } from './component/solve-case-form/solve-case-form.component';

@NgModule({
  declarations: [
    FirebaseTimestampPipe,
    CaseArticleComponent,
    VictimCardComponent,
    SuspectsListComponent,
    WitnessListComponent,
    SolveCaseFormComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    ScrollingModule,
    CdkScrollableModule,
    TabsModule.forRoot(),
    NgbNavModule
  ],
  exports: [
    FirebaseTimestampPipe,
    CaseArticleComponent,
    VictimCardComponent,
    SuspectsListComponent,
    WitnessListComponent,
    SolveCaseFormComponent
  ],
  providers: [
    DatePipe,
    FirebaseTimestampPipe
  ]
})
export class SharedModule { }
