import {Component, OnInit} from '@angular/core';
import {CardService} from '../../../../_services/card.service';

@Component({
    selector: 'app-settings-payment-cards',
    templateUrl: './settings-payment-cards.component.html',
    styleUrls: ['./settings-payment-cards.component.less']
})
export class SettingsPaymentCardsComponent implements OnInit {

    /** List of the user's payment cards */
    cards: any[] = null;

    constructor(private cardService: CardService) {
    }

    ngOnInit() {
        this.getCards();
    }

    /**
     * Gets the user's payment cards from API
     */
    getCards() {
        this.cardService.getCards().then(data => this.cards = (<any>data).records).catch();
    }

    /**
     * Deletes selected card and gets new card list
     * @param id Id of card user is going to delete
     */
    onDelete(id) {
        this.cardService.deleteCard(id).then(() => this.getCards()).catch();
    }

}
