import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-bonuses-details-ittem',
  templateUrl: './bonuses-details-ittem.component.html',
  styleUrls: ['./bonuses-details-ittem.component.less']
})
export class BonusesDetailsIttemComponent implements OnInit {
    @Input() bonus;
  constructor() { }

  ngOnInit() {

  }

}
