import {Component, OnInit} from '@angular/core';
import {TransactionService} from '../../../../_services/transaction.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-transaction-bill',
    templateUrl: './transaction-bill.component.html',
    styleUrls: ['./transaction-bill.component.less']
})
export class TransactionBillComponent implements OnInit {

    /** Transaction in bill */
    selectedTransaction = null;
    /** Types of transaction that is commission */
    commissionTypes: string[] = ['commission', 'commission_authorization', 'commission_capture', 'commission_reversal'];
    /** Types of transaction that is main transaction */
    transactionTypes: string[] = ['transfer', 'split', 'merge', 'issue', 'balance', 'redeem', 'authorization', 'capture', 'reversal'];
    /** Transaction commission */
    commission: any = null;
    /** Main transaction */
    transaction: any = null;
    /** Coin used in transaction (if it is only one) */
    clientCoin: any = null;
    /** Coin where funds was taken from */
    fromCoin: any = null;
    /** Coin where funds was transferred to */
    toCoin: any = null;

    constructor(private transactionService: TransactionService, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            // gets selected transaction
            this.transactionService.getTransView({
                'filter': {
                    'ids': [
                        params['id']
                    ]
                },
                'pageNumber': 0,
                'pageSize': 1
            }).then(data => {
                this.selectedTransaction = data.records[0];


                if (!this.selectedTransaction) {
                    this.router.navigate(['../../'], {relativeTo: this.route});
                    return;
                }

                let transactions = this.findTransactions();

                // finds coins used in transaction
                this.clientCoin = this.selectedTransaction.clientCoin;
                this.fromCoin = this.selectedTransaction.from || this.selectedTransaction.srcClientCoin;
                this.toCoin = this.selectedTransaction.to || this.selectedTransaction.destClientCoin || this.selectedTransaction.merchantCoinSerial;

                // if coins was not found takes info about the coins from transaction objects
                if (!this.clientCoin && !this.fromCoin && !this.toCoin) {
                    this.fromCoin = transactions.find(transaction => !!transaction.form).from || null;
                    this.toCoin = transactions.find(transaction => !!transaction.to).to || null;
                }

                if (this.selectedTransaction.type !== 'exchange_transaction') {
                    this.transaction = this.findTransaction();
                    this.commission = this.findCommission();
                }
            }).catch(() => this.router.navigate(['../../'], {relativeTo: this.route}));
        });


    }

    /**
     * Opens print window
     */
    onPrint() {
        let printContents, popupWin;
        printContents = document.getElementById('print').innerHTML;
        popupWin = window.open();
        popupWin.document.open();
        popupWin.document.write(`
      <html>
        <head>
        <title>Transaction bill</title>
          <style>
          td {
            padding: 5px;
            border: 1px solid black
          }
          table {
            border-collapse: collapse;
          }
        </style>
        </head>
        <body onload='window.print();window.close()'>
          <h2>Transaction bill</h2>
          ${printContents}
        </body>
      </html>`
        );
        popupWin.document.close();
    }

    /**
     * Finds transaction which type is commission
     * @returns {any}
     */
    findCommission() {
        let transactions: any[] = this.selectedTransaction.transactions;
        return transactions.find(transaction => this.commissionTypes.indexOf(transaction.type) > -1);
    }

    /**
     * Finds transaction which type is main transaction
     * @returns {any}
     */
    findTransaction() {
        let transactions: any[] = this.selectedTransaction.transactions;
        let temp = transactions.find(transaction => transaction.type === 'transfer');
        if (temp) return temp;
        else return transactions.find(transaction => this.transactionTypes.indexOf(transaction.type) > -1);
    }

    /**
     * Finds all transactions that are main transactions
     * @returns {any[]}
     */
    findTransactions() {
        let transactions: any[] = this.selectedTransaction.transactions;
        return transactions.filter(transaction => this.transactionTypes.indexOf(transaction.type) > -1);
    }

}
