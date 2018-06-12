import {Coin} from './coin';

export interface Amount {
    amount: number;
    currency: string;
}

export class TransactionItem {
    /** Types of transaction process that is commission */
    static commissionTypes: string[] =
        ['commission', 'commission_authorization', 'commission_capture', 'commission_reversal'];
    /** Types of transaction process that is transaction */
    static transactionTypes: string[] =
        ['transfer', 'split', 'merge', 'issue', 'balance', 'redeem', 'authorization', 'capture', 'reversal'];
    /** Transaction object received from API */
    transaction;
    /** Amounts of transaction */
    transactionAmounts: Amount[] = [];
    /** Commissions of transactions*/
    transactionCommissions: Amount[] = [];

    /** Coin used for transactions */
    coins = {
        /** For process with one coin */
        clientCoin: null,
        /** Coin where funds was taken from */
        fromCoin: null,
        /** Coin where funds was transferred to */
        toCoin: null
    };

    userCoins: Coin[];

    constructor() {
    }

    /**
     * Finds coin name by serial
     * @param coins A list of the user`s coins
     * @param coin
     * @returns {string} String with coin name and coin serial or just serial if the user doesn't have such coin
     */
    static findCoin(coins: Coin[], coin: Coin | string): Coin {
        if (!coin) {
            return null;
        }
        if (typeof coin === 'string') {
            coin = {serial: coin};
        }
        const resultCoin: Coin = coins.find((c => c.serial === (<Coin>coin).serial));
        return resultCoin || coin;
    }

    /**
     * Finds all transactions processes that are transactions
     * @returns {any[]}
     */
    static findTransactions(transaction): any[] {
        const transactionProcesses: any[] = transaction.transactions;
        return transactionProcesses.filter(t => TransactionItem.transactionTypes.includes(t.type));
    }

    /**
     * Finds all transactions processes that are commission
     * @returns {any[]}
     */
    static findCommissions(transaction): any[] {
        const transactionProcesses: any[] = transaction.transactions;
        return transactionProcesses.filter(t => TransactionItem.commissionTypes.includes(t.type));
    }

    static getTransactionAmount(transaction, transactionProcesses: any[], coins): Amount[] {
        const amounts = [];

        const usedCoin = coins.clientCoin || coins.toCoin || coins.clientCoin;
        const currency = usedCoin ? usedCoin.issuer.currency : '';

        if (transaction.amount) {
            amounts.push({amount: transaction.amount, currency: currency});
        } else if (transaction.cashAmount) {
            amounts.push({amount: transaction.cashAmount, currency: currency});
        } else if (transaction.invoiceAmount) {
            amounts.push({amount: transaction.invoiceAmount, currency: currency});
        } else if (transaction.incomingAmount && transaction.outgoingAmount) {
            amounts.push({amount: transaction.incomingAmount, currency: coins.fromCoin.issuer.currency});
            amounts.push({amount: transaction.outgoingAmount, currency: coins.toCoin.issuer.currency});
        } else if (transactionProcesses.length) {
            transactionProcesses.forEach(tp => amounts.push({amount: tp.amount, currency: tp.issuer.currency}));
        }

        return amounts;
    }

    static getCommissionAmount(transaction, commissionProcesses: any[], coins, transactionAmounts): Amount[] {
        const commissions = [];

        const usedCoin = coins.clientCoin || coins.toCoin || coins.clientCoin;
        const currency = usedCoin ? usedCoin.issuer.currency : '';

        if (transaction.commission) {
            commissions.push({amount: transaction.commission, currency: currency});
        } else if (commissionProcesses.length) {
            commissionProcesses.forEach(c => commissions.push({amount: c.amount, currency: c.issuer.currency}));
        } else {
            transactionAmounts.forEach(t => commissions.push({amount: 0, currency: t.currency}));
        }

        return commissions;
    }

    setTransaction(transaction) {
        this.transaction = transaction;
        const transactionProcesses = TransactionItem.findTransactions(transaction);
        const commissionProcesses = TransactionItem.findCommissions(transaction);

        // finds coins used in transaction
        this.coins.clientCoin = transaction.clientCoin;
        this.coins.fromCoin = transaction.from || transaction.srcClientCoin;
        this.coins.toCoin = transaction.to || transaction.destClientCoin;

        // if coins was not found, takes info about the coins from transaction objects
        if (!this.coins.clientCoin && !this.coins.fromCoin && !this.coins.toCoin) {
            const from = transactionProcesses.find(t => t.from);
            const to = transactionProcesses.find(t => t.to);
            this.coins.fromCoin = from ? from.from : null;
            this.coins.toCoin = to ? to.to : null;
        }

        this.transactionAmounts =
            TransactionItem.getTransactionAmount(transaction, transactionProcesses, this.coins);
        this.transactionCommissions =
            TransactionItem.getCommissionAmount(transaction, commissionProcesses, this.coins, this.transactionAmounts);

        if (!this.coins.toCoin && transaction.merchantCoinSerial) {
            this.coins.toCoin = {serial: transaction.merchantCoinSerial};
        }

        Object.values(this.coins).forEach(coin => {
            if (coin) {
                coin['name'] = TransactionItem.findCoin(this.userCoins, coin).name;
            }
        });
    }
}
