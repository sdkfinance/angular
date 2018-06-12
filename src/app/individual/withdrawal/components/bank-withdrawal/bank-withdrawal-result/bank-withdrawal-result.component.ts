import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-bank-withdrawal-result',
    templateUrl: './bank-withdrawal-result.component.html',
    styles: []
})
export class BankWithdrawalResultComponent implements OnInit {

    @Input() result;

    constructor() {
    }

    ngOnInit() {
    }

}
