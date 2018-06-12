export class Coin {
    serial?: string;
    name?: string;
    amount?: number;
    availableAmount?: number;
    issuer?: {
        id: string;
        sn: string;
        currency: string
    };
    active?: boolean;
    type?: string;
}
