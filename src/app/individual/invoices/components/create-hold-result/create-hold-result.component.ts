import {Component, Input, OnInit} from '@angular/core';
import {CardHoldItem} from '../../../../_interfaces/card-hold-item';

@Component({
    selector: 'app-create-hold-result',
    templateUrl: './create-hold-result.component.html',
    styleUrls: ['./create-hold-result.component.less']
})
export class CreateHoldResultComponent implements OnInit {

    @Input() hold: CardHoldItem;

    constructor() {
    }

    ngOnInit() {
    }

}
