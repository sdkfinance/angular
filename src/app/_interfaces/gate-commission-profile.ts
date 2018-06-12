import {Currency} from './currency';

export interface GateCommissionProfile {
    id: string;
    providerAccountId: string;
    providerCurrency: Currency;
}
