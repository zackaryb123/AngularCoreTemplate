import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CaseRoutingModule} from './case-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {CaseComponent} from './case.component';

@NgModule({
  declarations: [CaseComponent],
  imports: [
    CommonModule,
    // SharedModule,
    CaseRoutingModule
  ]
})
export class CaseModule { }
