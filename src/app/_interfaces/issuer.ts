import {Currency} from './currency';

export interface Issuer {
    id: string;
    sn: string;
    name: string;
    description: string;
    orderNumber: number;
    orderQuote: number;
    active: boolean;
    currency: Currency;
}
