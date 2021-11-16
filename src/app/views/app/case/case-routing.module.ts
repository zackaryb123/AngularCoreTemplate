import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CaseComponent} from './case.component';

const routes: Routes = [
  {
    path: '',
    component: CaseComponent,
    data: {
      title: 'Case'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaseRoutingModule {}
