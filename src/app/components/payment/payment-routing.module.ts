import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PaymentComponent} from './payment.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Payment'
    },
    children: [
      {
        path: '',
        redirectTo: 'credit-card',
        pathMatch: 'full'
      },
      {
        path: 'credit-card',
        component: PaymentComponent,
        data: {
          title: 'Payments'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule {}
