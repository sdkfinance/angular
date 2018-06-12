export interface InvoiceTemplate {
    id: string;
    templateName: string;
    name: string;
    amount: number;
    payerContact: string;
    recipientCoin: string;
    data: {
        productCode: string;
        productPrice: number;
        description: string;
        count: number;
        terms: string
    };
    createdAt: string;
    expiresAt: string;
}
