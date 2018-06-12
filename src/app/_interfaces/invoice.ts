export interface Invoice {
    identifier: string;
    name: string;
    createdAt: string;
    status: string;
    payer: {
        id: string;
        type: string;
        name: string
    };
    payerContact: string;
    merchantName: string;
    totalPrice: number;
    expiresAt: string;
    issuer: {
        id: string;
        sn: string;
        currency: string
    };
    data: {
        productCode: string;
        productPrice: 0;
        description: string;
        count: 0;
        terms: string
    };
}
