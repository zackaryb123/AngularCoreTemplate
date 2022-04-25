import { Component, OnInit } from '@angular/core';
import {BsDatepickerViewMode} from 'ngx-bootstrap/datepicker';
import {DatePipe} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PaymentService} from '../service/payment.service';

@Component({
  selector: 'app-credit-card-form',
  templateUrl: './credit-card-form.component.html',
  styleUrls: ['./credit-card-form.component.scss']
})
export class CreditCardFormComponent implements OnInit {
  // Payment Form variables
  minMode: BsDatepickerViewMode = 'month';
  datePicker: Date = new Date();
  creditCardForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private paymentService: PaymentService
  ) {
    this.buildCreditCardForm();
  }

  ngOnInit(): void {
  }

  buildCreditCardForm() {
    this.creditCardForm = this.formBuilder.group({
      cardNumber: ['', [
        Validators.required,
        Validators.minLength(10)],
        // Validators.pattern('')
      ],
      cardHolderName: ['', [
        Validators.required,
        // Validators.minLength(10)
      ]],
      cvv: ['', [
        Validators.required,
        // Validators.minLength(3),
        // Validators.maxLength(4)
      ]],
      zipCode: ['', [
        Validators.required,
        // Validators.minLength(3),
        // Validators.maxLength(10)
      ]]
    });
  }

  sendFile(file) {
    console.log('Send File :', file);
    this.paymentService.postCardFile(file).toPromise().then((res: any) => {
      this.creditCardForm.controls['cardNumber'].setValue(res.account);
      const expDate = res.experatopnDate.split('/');
      if (expDate.length === 2) {
        const month = expDate[0];
        let year = expDate[1];
        const currentDate = new Date();
        if (year.length === 2) {
          year = currentDate.getUTCFullYear().toString().substr(0, 2) +  expDate[1];
        }
        console.log(month + '/' + year);
        this.datePicker = new Date(Number(year), Number(month));
      }
      this.creditCardForm.controls['cardHolderName'].setValue(res.name.firstName + ' ' + res.name.middleInitial + ' ' + res.name.lastName);
      this.creditCardForm.controls['cvv'].setValue(res.cvv);
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  }
}
