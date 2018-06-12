import { Component, OnInit } from '@angular/core';

import { PAYMENT_TYPES } from '../../shared/payment-types';

@Component({
  selector: 'app-payment-types-menu',
  templateUrl: './payment-types-menu.component.html',
  styleUrls: ['./payment-types-menu.component.css']
})
export class PaymentTypesMenuComponent implements OnInit {
  public types = Object.keys(PAYMENT_TYPES);

  constructor() { }

  ngOnInit() {
  }

}
