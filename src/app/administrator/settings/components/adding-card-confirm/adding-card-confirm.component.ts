import {Component, Input, OnInit} from '@angular/core';
import {CardService} from '../../../../_services/card.service';

@Component({
    selector: 'app-adding-card-confirm',
    templateUrl: './adding-card-confirm.component.html',
    styles: []
})
export class AddingCardConfirmComponent implements OnInit {

    /** Object that contains confirmation code */
    @Input() confirmInfo;
    result;
    waiting: boolean = false;

    constructor(private cardService: CardService) {
    }

    ngOnInit() {
    }

    /** Makes a request to confirm card attachment */
    confirmAttachment() {
        this.waiting = true;
        this.cardService.confirmCardAttachment(this.confirmInfo.identifier, {
            code: this.confirmInfo.code
        }).then(data => {
            this.result = data;
            this.waiting = false;
        }).catch(() => this.waiting = false);
    }

}
