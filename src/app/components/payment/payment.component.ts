import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-payment',
  template: `
    <div class="position-relative">
      <app-credit-card-form></app-credit-card-form>
      <app-webcam class="position-absolute" style="top:0;width:100%"></app-webcam>
    </div>`
})
export class PaymentComponent implements OnInit {
  constructor(
  ) {
  }

  ngOnInit(): void {
  }
}
