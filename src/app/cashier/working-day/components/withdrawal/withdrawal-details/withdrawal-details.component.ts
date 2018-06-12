import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CashDeskWithdrawalService} from '../../../../../_services/cash-desk-withdrawal.service';

@Component({
    selector: 'app-withdrawal-details',
    templateUrl: './withdrawal-details.component.html',
    styleUrls: ['./withdrawal-details.component.less']
})
export class WithdrawalDetailsComponent implements OnInit {

    /** Withdrawal request details */
    @Input() details;
    @Output() checked = new EventEmitter();
    @Output() back = new EventEmitter();

    waiting: boolean;

    errors = {
        'not_accepted_or_not_today_opened_working_day': false
    };

    constructor(private withdrawalService: CashDeskWithdrawalService) {
    }

    ngOnInit() {
    }

    onBack() {
        this.back.emit();
    }

    /**
     * Makes a request to accept withdrawal request
     */
    onCheck() {
        this.waiting = true;
        this.withdrawalService.acceptWithdrawalRequest(this.details.requestId).then(data => {
            this.checked.emit(data.process);
            this.waiting = false;
        }).catch(e => {
            if (e.error.code === 'NOT_ACCEPTED_OR_NOT_TODAY_OPENED_WORKING_DAY') {
                this.errors.not_accepted_or_not_today_opened_working_day = true;
                this.waiting = false;
            }
        });
    }

}
