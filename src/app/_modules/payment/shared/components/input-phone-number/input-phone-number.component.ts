import { Component, OnInit } from '@angular/core';

import { InputComponent } from '../input';

@Component({
  selector: 'app-input-phone-number',
  templateUrl: './input-phone-number.component.html',
  styleUrls: ['./input-phone-number.component.css']
})
export class InputPhoneNumberComponent extends InputComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
