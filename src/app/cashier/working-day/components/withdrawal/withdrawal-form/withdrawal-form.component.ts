import {Component, OnInit} from '@angular/core';
import {Step} from '../../../../../_enums/step.enum';

@Component({
    selector: 'app-withdrawal-form',
    templateUrl: './withdrawal-form.component.html',
    styleUrls: ['./withdrawal-form.component.less']
})
export class WithdrawalFormComponent implements OnInit {

    /** Step enum */
    steps = Step;
    /** The current step */
    step: Step = this.steps.First;
    /** Information about withdrawal request */
    details;
    /** Withdrawal result */
    result;

    constructor() {
    }

    ngOnInit() {
    }

    /** Goes to the previous step */
    onBack() {
        this.step--;
    }

    /**
     * Sets the information about withdrawal request received by its number
     * @param details
     */
    setDetails(details) {
        this.details = details;
        this.step = this.steps.Second;
    }

    /**
     * Sets the top up result received from the second step
     * @param result
     */
    setResult(result) {
        this.result = result;
        this.step = this.steps.Third;
    }

}
