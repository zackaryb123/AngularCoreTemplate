import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cases',
    pathMatch: 'full',
  },
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'cases',
        loadChildren: () => import('../cases/cases.module').then(m => m.CasesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
