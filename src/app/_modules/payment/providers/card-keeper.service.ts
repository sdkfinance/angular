import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {Card} from '../shared/card.model';

@Injectable()
export class CardKeeperService {
    private initialCard = {
        cardNumber: '',
        month: '',
        year: '',
        nameOnCard: '',
        cvv: '',
        phone: '',
        email: '',
        isValid: {
            isCardNumberValid: false,
            isNameOnCardValid: false,
            isMonthValid: false,
            isYearValid: false,
            isCvvValid: false
        },
    };

    public card = new BehaviorSubject<Card>(this.initialCard);
    public card$ = this.card.asObservable();

    public isValid = new BehaviorSubject<boolean>(false);
    public isValid$ = this.isValid.asObservable();

    constructor() {
    }

    public setCard(val: Card): void {
        this.card.next(val);
        this.validate();
    }

    private validate(): void {
        this.isValid.next(
            !Object.values(
                this.card.getValue().isValid
            ).some(val => !val)
        );
    }

}
