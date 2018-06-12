import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Coin} from '../../../../../_classes/coin';
import {CashDesksService} from '../../../../../_services/cash-desks.service';
import {CashDesk} from '../../../../../_interfaces/cash-desk';

@Component({
    selector: 'app-cash-desks',
    templateUrl: './cash-desks.component.html',
    styleUrls: ['./cash-desks.component.less']
})
export class CashDesksComponent implements OnInit {

    /** The coin used for withdrawal */
    @Input() coin: Coin;
    /** The list of cash desks can be used for withdrawal from this coin */
    cashDesks: CashDesk[];
    /** Selects a cash desk */
    @Output() selectCashDesk = new EventEmitter();

    constructor(private cashDesksService: CashDesksService) {
    }

    ngOnInit() {
        this.getCashDesks();
    }

    /**
     * Makes a request to get cash desks for the coin
     */
    getCashDesks() {
        this.cashDesksService.getCashDeskForCoin({
            coinSerial: this.coin.serial
        }).then(data => {
            this.cashDesks = data.records as CashDesk[];
        }).catch(e => e);
    }

    /**
     * Selects cash desk for withdrawal
     * @param {CashDesk} cashDesks
     */
    onCashDesk(cashDesks: CashDesk) {
        this.selectCashDesk.emit(cashDesks);
    }

}
