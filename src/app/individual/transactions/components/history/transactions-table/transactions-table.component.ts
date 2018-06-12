import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TransactionService} from '../../../../../_services/transaction.service';
import {Pagination} from '../../../../../_services/page-state/pagination';
import {Coin} from '../../../../../_classes/coin';
import {TransactionsStorageService} from '../../../services/transactions-storage.service';

@Component({
    selector: 'app-transactions-table',
    templateUrl: './transactions-table.component.html',
    styleUrls: ['./transactions-table.component.less']
})
export class TransactionsTableComponent extends Pagination implements OnInit, OnDestroy {

    @Input() tableName = '';
    /** List of the user's coins */
    @Input() coins: Coin[];
    @Input() allowedTypes: string[];
    /** List of user transactions */
    transactions: any;
    storageName = 'transactions-table';
    filter: any;
    sort: any;

    constructor(private transactionService: TransactionService, private storage: TransactionsStorageService) {
        super();
    }

    ngOnInit() {
        if (this.storage.getStorage(this.storageName)) {
            this.getFromStorage();
        }

        this.filter = this.filter || {};
        this.filter['types'] = this.filter['types'] || this.allowedTypes;

        this.transactionService.getTransactions().subscribe(data => {
            this.transactions = data.records;
            this.page = data.pageNumber;
            this.totalPages = data.totalPages;
        });

        this.transactionService.updateTransactions(this.createTransactionBody());
    }

    setFilter({filter}) {
        this.filter = {
            ...this.filter,
            ...filter
        };
        this.page = 0;
        this.transactionService.updateTransactions(this.createTransactionBody());
    }

    setSort({sort}) {
        this.sort = sort;
        this.transactionService.updateTransactions(this.createTransactionBody());
    }

    /**
     * Build object for request body
     * @returns {{pageNumber: number; pageSize: number; filter: any; sort: any}}
     */
    createTransactionBody() {
        return {
            pageNumber: this.page,
            pageSize: this.size,
            filter: this.filter,
            sort: this.sort
        };
    }

    /**
     * Changes current page
     * @param page Page number to go
     */
    changePage(page) {
        this.page = page;
        this.transactionService.updateTransactions(this.createTransactionBody());
    }

    /**
     * Writes current filters into service
     */
    setToStorage() {
        this.storage.setStorage(this.tableName + this.storageName, {
            sort: this.sort,
            filter: this.filter
        });
    }

    /**
     * Read current filters from service
     */
    getFromStorage() {
        const data = this.storage.getStorage(this.tableName + this.storageName);
        this.sort = data['sort'];
        this.filter = data['filter'];
    }

    /**
     * Saves current filters so that the user could continue after coming back with last filter
     */
    ngOnDestroy() {
        this.setToStorage();
    }

}
