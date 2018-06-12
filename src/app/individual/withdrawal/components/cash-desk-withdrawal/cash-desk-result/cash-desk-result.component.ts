import {Component, Input, OnInit} from '@angular/core';
import {CashDesk} from '../../../../../_interfaces/cash-desk';

@Component({
    selector: 'app-cash-desk-result',
    templateUrl: './cash-desk-result.component.html',
    styleUrls: ['./cash-desk-result.component.less']
})
export class CashDeskResultComponent implements OnInit {

    @Input() result;
    @Input() cashDesk: CashDesk;

    constructor() {
    }

    ngOnInit() {
    }

}
