import {Component, Input, OnInit} from '@angular/core';
import {Coin} from '../../../../../_classes/coin';

@Component({
    selector: 'app-top-up-result',
    templateUrl: './top-up-result.component.html',
    styleUrls: ['./top-up-result.component.less']
})
export class TopUpResultComponent implements OnInit {
    /** Top up process result */
    @Input() result;
    /** The user's coins */
    @Input() coins: Coin[];

    constructor() {
    }

    ngOnInit() {
    }

    /**
     * Finds and returns a coin which was used in the top up process
     * @returns {Coin}
     */
    findCoin(): Coin {
        return this.coins.find(coin => coin.serial === this.result.clientCoin.serial);
    }

}
