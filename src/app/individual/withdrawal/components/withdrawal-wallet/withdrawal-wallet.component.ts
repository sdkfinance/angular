import {Component, OnInit} from '@angular/core';
import {CoinsService} from '../../../../_services/coins.service';
import {Coin} from '../../../../_classes/coin';
import {WithdrawalService} from '../../../../_services/withdrawal.service';

@Component({
    selector: 'app-withdrawal-wallet',
    templateUrl: './withdrawal-wallet.component.html',
    styles: []
})
export class WithdrawalWalletComponent implements OnInit {

    /** List of the user's coin */
    coins: Coin[];
    /** Serial number of selected coin by user to withdraw */
    serial;

    constructor(private coinsService: CoinsService, private withdrawalService: WithdrawalService) {
    }

    ngOnInit() {
        this.coins = this.withdrawalService.getCoins();
        if (this.coins.length) this.serial = this.coins[0].serial;
    }
}
