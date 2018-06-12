import {CardValidation} from './card-validation';

export interface Card {
    cardNumber: string;
    month: string;
    year: string;
    nameOnCard: string;
    cvv: string;
    phone: string;
    email: string;
    isValid: CardValidation;
}
