import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InvestmentService} from '../../../../_services/investment.service';
import {CashInputsService} from '../../../../_services/cash-inputs.service';
import {CashCollectsService} from '../../../../_services/cash-collects.service';
import {GateInvestmentService} from '../../../../_services/gate-investment.service';

@Component({
    selector: 'app-cash-operation-details',
    templateUrl: './cash-operation-details.component.html',
    styleUrls: ['./cash-operation-details.component.less']
})
export class CashOperationDetailsComponent implements OnInit {

    /** System operation details */
    @Input() operation;
    /** Resets operation to go to the previous step */
    @Output() resetOperation = new EventEmitter();
    /** Result of the operation accepting */
    acceptingResult;

    waiting: boolean = false;

    constructor(private gateInvestmentService: GateInvestmentService) {
    }

    ngOnInit() {
    }

    /**
     * Makes a request to accept operation
     */
    onAccept() {
        this.waiting = true;
        this.gateInvestmentService.acceptInvestmentRequest(this.operation.id).then(data => {
            this.acceptingResult = data;
            this.waiting = false;
        }).catch(e => {
            this.waiting = false;
        });
    }

    /**
     * Goes to the previous step
     */
    onBack() {
        this.resetOperation.emit();
    }

}
