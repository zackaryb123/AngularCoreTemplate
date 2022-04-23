import { Component, OnInit } from '@angular/core';
import {BsDatepickerViewMode} from 'ngx-bootstrap/datepicker';
import {DatePipe} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-credit-card-form',
  templateUrl: './credit-card-form.component.html',
  styleUrls: ['./credit-card-form.component.scss']
})
export class CreditCardFormComponent implements OnInit {
  // Payment Form variables
  minMode: BsDatepickerViewMode = 'month';
  datePicker: Date;
  creditCardForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
  ) {
    this.buildCreditCardForm();
  }

  ngOnInit(): void {
  }

  buildCreditCardForm() {
    this.creditCardForm = this.formBuilder.group({
      cardNumber: ['', [Validators.required, Validators.minLength(10)], Validators.pattern('')],
      cardHolderName: ['', [Validators.required, Validators.minLength(10)]],
      expDate: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
      zipCode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]]
    });
  }

  setDate() {
    const expDate = this.datePipe.transform(this.datePicker.getTime(), 'MM-yyyy');
    this.creditCardForm.controls['expDate'].setValue(expDate);
    console.log(this.creditCardForm.controls);
  }
}
