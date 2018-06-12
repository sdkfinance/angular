import {Currency} from './currency';

export interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    icon: string;
    accountId: string;
    currencies: {
        currency: Currency;
        minAmount: number;
        maxAmount: number;
    }[];
}
