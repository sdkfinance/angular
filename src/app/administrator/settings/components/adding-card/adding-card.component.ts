import {Component, OnInit} from '@angular/core';
import {CardService} from '../../../../_services/card.service';

@Component({
    selector: 'app-adding-card',
    templateUrl: './adding-card.component.html',
    styleUrls: ['./adding-card.component.less']
})
export class AddingCardComponent implements OnInit {

    /** Available card attachment methods */
    attachmentMethods: any[];
    /** Attachment methods that selected by user */
    selectedMethod;

    constructor(private cardService: CardService) { }

    ngOnInit() {
        this.getAttachmentMethods();
    }

    /**
     * Gets available card attachment methods from API
     */
    getAttachmentMethods() {
        this.cardService.getAttachmentMethods().then(data => this.attachmentMethods = data.ways).catch();
    }

    /**
     * Selects one method to send it into adding card form component
     * @param method Attachment methods that selected by user
     */
    selectMethod(method) {
        this.selectedMethod = method;
    }

    /**
     * Goes back to list of available card attachment methods
     */
    back() {
        this.selectedMethod = null;
    }

}
