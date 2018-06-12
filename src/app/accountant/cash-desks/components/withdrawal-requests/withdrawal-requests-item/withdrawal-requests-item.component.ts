import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CashDeskWithdrawalService} from '../../../../../_services/cash-desk-withdrawal.service';

@Component({
    selector: 'app-withdrawal-requests-item',
    templateUrl: './withdrawal-requests-item.component.html',
    styleUrls: ['./withdrawal-requests-item.component.less']
})
export class WithdrawalRequestsItemComponent implements OnInit {

    /** The withdrawal request */
    @Input() request;
    /** Updates list of requests */
    @Output() updateList = new EventEmitter();

    waiting: boolean = false;

    constructor(private withdrawalService: CashDeskWithdrawalService) {
    }

    ngOnInit() {
    }

    /**
     * Makes a request approve the withdrawal request
     */
    onApprove() {
        this.waiting = true;

        this.withdrawalService.approveWithdrawalRequest(this.request.requestId).then(data => {
            this.updateList.emit();
        }).catch(e => this.waiting = false);
    }

    /**
     * Makes a request to decline the withdrawal request
     */
    onDecline() {
        this.waiting = true;

        this.withdrawalService.declineWithdrawalRequest(this.request.requestId).then(data => {
            this.updateList.emit();
        }).catch(e => this.waiting = false);
    }

}
