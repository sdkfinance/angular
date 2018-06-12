import {Component, Input, OnInit} from '@angular/core';
import {Organization} from '../../../../_interfaces/organization';

@Component({
    selector: 'app-cash-desks-item',
    templateUrl: './cash-desks-item.component.html',
    styleUrls: ['./cash-desks-item.component.less']
})
export class CashDesksItemComponent implements OnInit {

    @Input() organization: Organization;

    constructor() {
    }

    ngOnInit() {
    }

}
