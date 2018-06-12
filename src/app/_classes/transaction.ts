export class Transaction {
    date: string = '';
    pos: any = {
        id : ''
    };
    posId?: string = '';
    parameters: any = {
        invoiceAmount: null,
        orderDescription: '',
        orderId: '',
    };
    identifier: number = null;
    status: string = '';
    issuer: any = {
        currency: ''
    };

    constructor(transaction?: Transaction) {
        if (transaction) {
            this.date = transaction.date;
            this.pos.id = transaction.pos.id || transaction.posId;
            this.parameters.invoiceAmount = transaction.parameters.invoiceAmount;
            this.parameters.orderDescription = transaction.parameters.orderDescription;
            this.parameters.orderId = transaction.parameters.orderId;
            this.identifier = transaction.identifier;
            this.status = transaction.status;
           this.issuer.currency = transaction.issuer.currency;
        }
    }

}
