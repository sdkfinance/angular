import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-online-payments-result',
    templateUrl: './online-payments-result.component.html',
    styles: []
})
export class OnlinePaymentsResultComponent implements OnInit {

    /** Info about result of payment */
    @Input() result;
    /** Service that was paid */
    @Input() service;
    /** Status of payment */
    status;

    constructor() {
    }

    ngOnInit() {
        this.status = this.result.transaction.status;
    }

}
