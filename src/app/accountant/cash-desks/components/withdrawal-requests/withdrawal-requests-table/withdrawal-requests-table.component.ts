import {Component, Input, OnInit} from '@angular/core';
import {CashDeskWithdrawalService} from '../../../../../_services/cash-desk-withdrawal.service';

@Component({
    selector: 'app-withdrawal-requests-table',
    templateUrl: './withdrawal-requests-table.component.html',
    styleUrls: ['./withdrawal-requests-table.component.less']
})
export class WithdrawalRequestsTableComponent implements OnInit {

    /** The cash desk id */
    @Input() cashDesk;
    /** A list of with withdrawal requests */
    requests: any[];

    constructor(private withdrawalService: CashDeskWithdrawalService) {
    }

    ngOnInit() {
        this.getRequests();
    }

    /***
     * Makes a request to get withdrawal requests for the cash desk
     */
    getRequests() {
        this.withdrawalService.getWithdrawalRequestsForCashDesk(this.cashDesk).then(data => {
            this.requests = data.records as any[];
        }).catch(e => this.requests = []);
    }

}
