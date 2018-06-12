import {Component, OnInit} from '@angular/core';
import {SmartCardsService} from '../../../../_services/smart-cards.service';

@Component({
    selector: 'app-settings-smart-cards',
    templateUrl: './settings-smart-cards.component.html',
    styleUrls: ['./settings-smart-cards.component.less']
})
export class SettingsSmartCardsComponent implements OnInit {

    /** List of the user's smart card */
    smartCards;

    constructor(private smartCardsService: SmartCardsService) {
    }

    ngOnInit() {
        this.getSmartCards();
    }

    /**
     * Gets list of the user's smart card from API
     */
    getSmartCards() {
        this.smartCardsService.getSmartCards().then(data => {
            this.smartCards = data.records;
        }).catch();
    }

}
