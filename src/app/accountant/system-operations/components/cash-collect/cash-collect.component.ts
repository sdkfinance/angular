import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Organization} from '../../../../_interfaces/organization';
import {Coin} from '../../../../_classes/coin';
import {CashCollectsService} from '../../../../_services/cash-collects.service';

@Component({
    selector: 'app-cash-collect',
    templateUrl: './cash-collect.component.html',
    styleUrls: ['./cash-collect.component.less']
})
export class CashCollectComponent implements OnInit {

    /** List of organizations <cash_desk> */
    @Input() organizations: Organization[];
    /** Selected organization id */
    @Input() organizationId;
    /** Coins of an organization */
    @Input() coins: Coin[];
    /** Investment request result */
    result;

    @ViewChild('form') form;

    constructor(private collectsService: CashCollectsService) {
    }

    ngOnInit() {
    }

    /**
     * Makes a request to create cash collect request
     * @param body
     */
    createCollect(body) {
        this.collectsService.createCollectRequest(body).then(data => {
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
     * Makes a request to view collect details
     * @param id
     */
    viewResult(id) {
        this.collectsService.viewCollectDetails(id).then(data => {
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
