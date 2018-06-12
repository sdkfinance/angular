import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {InvestmentService} from '../../../../_services/investment.service';
import {Organization} from '../../../../_interfaces/organization';
import {Coin} from '../../../../_classes/coin';
import {SystemOperationsService} from '../../services/system-operations.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {GateInvestmentService} from '../../../../_services/gate-investment.service';

@Component({
    selector: 'app-investment',
    templateUrl: './investment.component.html',
    styleUrls: ['./investment.component.less']
})
export class InvestmentComponent implements OnInit {

    /** List of organizations <cash_desk> and <date_provider> */
    @Input() organizations: Organization[];
    /** Selected organization id */
    @Input() organizationId;
    /** Coins of an organization */
    @Input() coins: Coin[];
    /** Investment request result */
    result;

    @ViewChild('form') form;

    constructor(private investmentService: InvestmentService,
                private gateInvestmentService: GateInvestmentService) {
    }

    ngOnInit() {
    }

    /**
     * Makes a request to create investment request
     * @param body
     */
    createInvestment(body) {
        this.getInvestmentRequest(body).then(data => {
            const id = data.process.requestIdentifier;
            // this.viewResult(id);

            this.result = data.process;
            this.result['coin'] = this.coins.find(c => c.serial = body.serial);
            this.result['amount'] = body.amount;
            this.result['receiver'] = this.organizations.find(o => o.id === this.organizationId);
            this.form.waiting = false;

        }).catch(() => this.form.waiting = false);
    }

    /**
     * Returns a request of creating investment of selected organization type
     * @param body
     * @returns {Promise<any>}
     */
    getInvestmentRequest(body) {
        const type = this.organizations.find(o => o.id === this.organizationId).type;

        if (type === 'cash_desk') {
            return this.investmentService.createInvestmentRequest(body);
        } else if (type === 'gate_provider') {
            return this.gateInvestmentService.createInvestmentRequest(body);
        }
    }

    /**
     * Makes a request to view investment details
     * @param id
     */
    viewResult(id) {
        this.investmentService.viewInvestmentRequest(id).then(data => {
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
