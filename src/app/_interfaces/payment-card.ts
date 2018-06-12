export interface PaymentCard {
    id: string;
    bin: string;
    last4Digits: string;
    mask: string;
    verified: false;
    active: false;
}
