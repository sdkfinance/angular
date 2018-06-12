import {Component, Input, OnInit} from '@angular/core';
import {CardHoldItem} from '../../../../_interfaces/card-hold-item';
import {CardHoldsService} from '../../../../_services/card-holds.service';

@Component({
    selector: 'app-card-hold-item',
    templateUrl: './card-hold-item.component.html',
    styleUrls: ['./card-hold-item.component.less']
})
export class CardHoldItemComponent implements OnInit {

    @Input() hold: CardHoldItem;

    constructor(private holdsService: CardHoldsService) {
    }

    ngOnInit() {
    }

    onCapture() {
        this.holdsService.captureCardHold(this.hold.id).then().catch();
    }

    onRelease() {
        this.holdsService.releaseCardHold(this.hold.id).then().catch();
    }
}
