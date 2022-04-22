import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreditCardFormComponent} from './credit-card-form/credit-card-form.component';

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
        component: CreditCardFormComponent,
        data: {
          title: 'Credit Card'
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
