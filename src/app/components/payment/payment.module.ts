import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormBuilder, FormsModule} from '@angular/forms';
import {CreditCardFormComponent} from './credit-card-form/credit-card-form.component';
import {PaymentRoutingModule} from './payment-routing.module';
import {BsDatepickerConfig, BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {DeviceDetectorService} from 'ngx-device-detector';
import {WebcamModule} from 'ngx-webcam';
import {WebcamComponent} from './webcam/webcam.component';
import {PaymentComponent} from './payment.component';

@NgModule({
  declarations: [
    PaymentComponent,
    CreditCardFormComponent,
    WebcamComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    FormsModule,
    WebcamModule,
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
