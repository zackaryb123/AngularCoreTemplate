import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CreditCardFormComponent} from './components/credit-card-form/credit-card-form.component';
import {PaymentRoutingModule} from './payment-routing.module';
import {BsDatepickerConfig, BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {DeviceDetectorService} from 'ngx-device-detector';
import {WebcamModule} from 'ngx-webcam';
import {WebcamComponent} from './components/webcam/webcam.component';
import {PaymentComponent} from './payment.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {HttpClientModule} from '@angular/common/http';
import { LoadingComponent } from './components/loading/loading.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {NgxImageCompressService} from 'ngx-image-compress';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [
    PaymentComponent,
    CreditCardFormComponent,
    WebcamComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    FormsModule,
    WebcamModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BsDropdownModule
  ],
  providers: [
    BsDatepickerConfig,
    FormBuilder,
    DatePipe,
    DeviceDetectorService,
    NgxImageCompressService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PaymentModule { }
