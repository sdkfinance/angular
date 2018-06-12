import {Invoice} from './invoice';

export interface CardHoldItem {
    id: string;
    date: string;
    status: string;
    invoice: Invoice;
    cardTx: {
        id: string;
        phase: string;
        createdAt: string;
        paymentCardId: string;
    };
    heldAmount: number;
}
