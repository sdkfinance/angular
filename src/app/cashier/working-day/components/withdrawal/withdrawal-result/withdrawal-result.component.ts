import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-withdrawal-result',
    templateUrl: './withdrawal-result.component.html',
    styleUrls: ['./withdrawal-result.component.less']
})
export class WithdrawalResultComponent implements OnInit {

    /** Withdrawal process */
    @Input() result;

    constructor() {
    }

    ngOnInit() {
    }

}
