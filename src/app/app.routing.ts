import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import {ButtonsComponent} from './views/buttons/buttons.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'payment',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'button',
    component: ButtonsComponent,
    loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule),
    data: {
      title: 'Component Test'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Payment'
    },
    children: [
      {
        path: 'payment',
        loadChildren: () => import('../modules/payment/payment.module').then(m => m.PaymentModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
