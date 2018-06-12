import {Component, OnInit} from '@angular/core';
import {ONLINE_PAYMENTS_CATEGORIES} from '../../../../app.constants';

@Component({
    selector: 'app-online-payments-categories',
    templateUrl: './online-payments-categories.component.html',
    styleUrls: ['./online-payments-categories.component.less']
})
export class OnlinePaymentsCategoriesComponent implements OnInit {

    /** List of online payment categories */
    services = ONLINE_PAYMENTS_CATEGORIES;

    constructor() {
    }

    ngOnInit() {
    }

}
