import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InvestmentService} from '../../../../_services/investment.service';
import {CashInputsService} from '../../../../_services/cash-inputs.service';
import {CashCollectsService} from '../../../../_services/cash-collects.service';

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

    constructor(private investmentService: InvestmentService,
                private inputsService: CashInputsService,
                private collectsService: CashCollectsService) {
    }

    ngOnInit() {
    }

    /**
     * Makes a request to accept operation
     */
    onAccept() {
        this.waiting = true;
        this.acceptOperation().then(data => {
            this.acceptingResult = data;
            this.waiting = false;
        }).catch(e => {
            this.waiting = false;
        });
    }

    /**
     * Returns a request related to the selected operation
     * @returns {Promise<any>}
     */
    acceptOperation() {
        if (this.operation.type === 'cash_collect') {
            return this.collectsService.acceptCollectRequest(this.operation.id);
        } else if (this.operation.type === 'cash_input') {
            return this.inputsService.acceptInputRequest(this.operation.id);
        } else {
            return this.investmentService.acceptInvestmentRequest(this.operation.id);
        }
    }

    /**
     * Goes to the previous step
     */
    onBack() {
        this.resetOperation.emit();
    }

}
