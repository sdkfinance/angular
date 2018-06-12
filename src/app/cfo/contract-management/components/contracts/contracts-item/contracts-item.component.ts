import {Component, Input, OnInit} from '@angular/core';
import {Contract} from '../../../../../_interfaces/contract';
import {ORGANIZATION_TYPES} from '../../../../../app.constants';

@Component({
    selector: 'app-contracts-item',
    templateUrl: './contracts-item.component.html',
    styleUrls: ['./contracts-item.component.less']
})
export class ContractsItemComponent implements OnInit {

    @Input() contract: Contract;

    orgTypes = ORGANIZATION_TYPES;

    constructor() {
    }

    ngOnInit() {
    }

}
