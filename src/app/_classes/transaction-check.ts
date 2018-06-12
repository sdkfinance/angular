import {Transaction} from "./transaction";
export class TransactionCheck extends Transaction {

    constructor(transaction?: Transaction) {
        super(transaction.parameters.invoiceAmount);
    }
}
