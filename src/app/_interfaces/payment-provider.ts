export interface PaymentProvider {
    accountId: string;
    account: {
        id: string;
        provider: {
            name: string
        }
    };
    way: string;
}
