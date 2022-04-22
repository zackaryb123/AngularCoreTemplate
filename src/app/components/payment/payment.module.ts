import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormBuilder, FormsModule} from '@angular/forms';
import {CreditCardFormComponent} from './credit-card-form/credit-card-form.component';
import {PaymentRoutingModule} from './payment-routing.module';
import {BsDatepickerConfig, BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {DeviceDetectorService} from 'ngx-device-detector';

@NgModule({
  declarations: [
    CreditCardFormComponent,
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [
    BsDatepickerConfig,
    FormBuilder,
    DatePipe,
    DeviceDetectorService
  ]
})
export class PaymentModule { }
