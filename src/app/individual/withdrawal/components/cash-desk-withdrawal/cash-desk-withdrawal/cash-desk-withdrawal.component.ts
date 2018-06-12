import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WithdrawalService} from '../../../../../_services/withdrawal.service';
import {Coin} from '../../../../../_classes/coin';
import {Step} from '../../../../../_enums/step.enum';
import {CashDesk} from '../../../../../_interfaces/cash-desk';

@Component({
    selector: 'app-cash-desk-withdrawal',
    templateUrl: './cash-desk-withdrawal.component.html',
    styleUrls: ['./cash-desk-withdrawal.component.less']
})
export class CashDeskWithdrawalComponent implements OnInit {

    /** The serial of the coin where the user withdraw from */
    serial: string;
    /** The coin where the user withdraw from */
    coin: Coin;
    /** Selected cash desk that wil be used for withdraw */
    cashDesk: CashDesk;

    result;
    steps = Step;
    step: Step;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private withdrawalService: WithdrawalService) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.serial = params['serial'];
            this.coin = this.withdrawalService.getCoins().find(coin => this.serial === coin.serial);
            if (this.coin) {
                this.step = this.steps.First;
            } else {
                this.router.navigate(['../../'], {relativeTo: this.route});
            }
        });
    }

    setCashDesk(cashDesk) {
        this.cashDesk = cashDesk;
        this.step = this.steps.Second;
    }

    setResult(result) {
        this.result = result;
        this.step = this.steps.Third;
    }

    onBack() {
        this.step--;
    }
}
