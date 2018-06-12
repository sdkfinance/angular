import {Component, OnInit} from '@angular/core';
import {OnlinePaymentsService} from '../../../../_services/online-payments.service';
import {ActivatedRoute} from '@angular/router';
import {PAGE_TITLES, WINDOW_TITLE} from '../../../../app.constants';
import {TitleService} from '../../../../_services/title.service';
import {Title} from '@angular/platform-browser';


@Component({
    selector: 'app-online-payments-pay',
    templateUrl: './online-payments-pay.component.html',
    styles: []
})
export class OnlinePaymentsPayComponent implements OnInit {

    /** Selected service for payment*/
    service;
    /** Transaction based on payment */
    transaction;
    /** Result of payment */
    result;

    constructor(private route: ActivatedRoute, private paymentsService: OnlinePaymentsService, private titleService: Title) {
        this.titleService.setTitle(PAGE_TITLES.payments);
        TitleService.setTitle(WINDOW_TITLE.payments);
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            let id: string = params['id'];
            this.getService(id);
        });
    }

    /**
     * Gets service with the specified name
     * @param name Name of service
     */
    getService(name) {
        this.paymentsService.viewProducts({
            filter: {
                //id: id
                name: name
            },
            pageNumber: 0,
            pageSize: 1
        }).then(data => {
            this.service = data.records[0];
        }).catch(() => this.service = []);
    }

    /**
     * Sets transaction based on payment
     * @param transaction
     */
    createTransaction(transaction) {
        this.transaction = transaction;
    }

    /**
     * Goes to previous step
     */
    goBack() {
        this.transaction = null;
    }

    /**
     * Sets result of payment
     * @param result
     */
    getResult(result) {
        this.transaction = null;
        this.result = result;
    }

}
