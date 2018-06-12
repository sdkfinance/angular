import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CardService} from '../../../../_services/card.service';
import {PaymentCard} from '../../../../_interfaces/payment-card';

@Component({
    selector: 'app-existing-card',
    templateUrl: './existing-card.component.html',
    styleUrls: ['./existing-card.component.less']
})
export class ExistingCardComponent implements OnInit {

    cards: PaymentCard[];
    selectedCardId: string;

    @Input() serverErrors = [];
    @Input() waiting;

    @Output() onSubmit = new EventEmitter();
    @Output() back = new EventEmitter();

    constructor(private cardService: CardService) {
    }

    ngOnInit() {
        this.getCards();
    }

    /**
     * Makes a request to get the payment cards of the current user
     */
    getCards() {
        this.cardService.getCards().then(data => {
            this.cards = (data.records as PaymentCard[]).filter(card => card.active);
            if (this.cards.length) {
                this.selectedCardId = this.cards[0].id;
            }
        }).catch();
    }

    onBack() {
        this.back.emit();
    }

    onCard(id) {
        if (!this.waiting) {
            this.selectedCardId = id;
            this.makeTransaction();
        }
    }

    makeTransaction() {
        this.waiting = true;
        this.onSubmit.emit([{
            name: 'id',
            value: this.selectedCardId
        }]);
    }

}
