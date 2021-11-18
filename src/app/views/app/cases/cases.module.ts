import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {CasesRoutingModule} from './cases-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {CasesComponent} from './cases.component';
import {CaseListComponent} from './case-list/case-list.component';
import {NgbNavModule} from '@ng-bootstrap/ng-bootstrap';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {TooltipModule} from 'ngx-bootstrap/tooltip';

@NgModule({
  declarations: [CasesComponent, CaseListComponent],
  imports: [
    CommonModule,
    SharedModule,
    CasesRoutingModule,
    NgbNavModule,
    ScrollingModule,
    TooltipModule
  ],
  providers: [
  ]
})
export class CasesModule { }
