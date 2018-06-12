import {Component, Input, OnInit} from '@angular/core';
import {Coin} from '../../../../_classes/coin';

@Component({
    selector: 'app-coin',
    templateUrl: './coin.component.html',
    styleUrls: ['coin.component.css']
})
export class CoinComponent implements OnInit {
    @Input() coin: Coin;

    constructor() {
    }

    ngOnInit() {
    }

}
