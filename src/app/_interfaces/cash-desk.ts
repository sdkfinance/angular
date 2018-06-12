import {Issuer} from './issuer';

export interface CashDesk {
    id: string;
    name: string;
    issuers: Issuer[];
    address: string;
    type: string;
    coordinate: {
        latitude: string;
        longitude: string
    };
}
