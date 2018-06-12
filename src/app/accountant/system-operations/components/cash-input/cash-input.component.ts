import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Organization} from '../../../../_interfaces/organization';
import {Coin} from '../../../../_classes/coin';
import {CashInputsService} from '../../../../_services/cash-inputs.service';

@Component({
    selector: 'app-cash-input',
    templateUrl: './cash-input.component.html',
    styleUrls: ['./cash-input.component.less']
})
export class CashInputComponent implements OnInit {

    /** List of organizations <cash_desk> */
    @Input() organizations: Organization[];
    /** Selected organization id */
    @Input() organizationId;
    /** Coins of an organization */
    @Input() coins: Coin[];
    /** Investment request result */
    result;
    errors;

    @ViewChild('form') form;

    constructor(private inputsService: CashInputsService) {
    }

    ngOnInit() {
    }

    /**
     * Makes a request to create cash input request
     * @param body
     */
    createInput(body) {
        this.inputsService.inputCash(body).then(data => {
            const id = data.process.requestIdentifier;
            // this.viewResult(id);

            this.result = data.process;
            this.result['coin'] = this.coins.find(c => c.serial = body.serial);
            this.result['amount'] = body.amount;
            this.result['receiver'] = this.organizations.find(o => o.id === this.organizationId);
            this.form.waiting = false;
        }).catch(error => {
            this.form.waiting = false;
            error = error.error;
            if (error.code === 'REQUIRED_AMOUNT_GREATER_THAN_CURRENT') {
                this.errors = ['amount.greater'];
            }
        });
    }

    /**
     * Makes a request to view input details
     * @param id
     */
    viewResult(id) {
        this.inputsService.viewInputDetails(id).then(data => {
            this.result = data.details;
            this.form.waiting = false;
        }).catch(() => this.form.waiting = false);
    }

    /**
     * Closes result
     */
    onClose() {
        this.result = null;
    }

}
