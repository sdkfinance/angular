import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {TransactionsStorageService} from '../../../services/transactions-storage.service';
import {TRANSACTION_STATUSES, TRANSACTION_TYPES} from '../../../../../app.constants';

@Component({
    selector: 'app-transactions-table-header',
    templateUrl: './transactions-table-header.component.html',
    styleUrls: ['./transactions-table-header.component.less']
})
export class TransactionsTableHeaderComponent implements OnInit, OnDestroy {

    @Input() tableName;
    @Input() allowedTypes: string[];
    @Output() sorting = new EventEmitter();
    @Output() search = new EventEmitter();

    storageName = 'transactions-header';
    /** List of transaction types */
    transactionsTypes: any;
    /** List of transaction statuses */
    transactionsStatuses: any;
    /** Selected types */
    types: string[] = [];
    /** Selected statuses */
    statuses: string[] = [];

    showTypes = false;

    showStatuses = false;

    sort: any = {
        date: 'desc',
        status: null,
        type: null
    };
    filter = {};

    constructor(private storage: TransactionsStorageService) {
    }

    ngOnInit() {
        if (this.storage.getStorage(this.storageName)) {
            this.getFromStorage();
        } else {
            this.transactionsTypes = this.allowedTypes.map(element => new Object({
                type: element,
                description: TRANSACTION_TYPES[element],
                selected: true
            }));
            this.transactionsStatuses = Object.keys(TRANSACTION_STATUSES).map(element => new Object({
                type: element,
                description: TRANSACTION_STATUSES[element],
                selected: true
            }));
        }

        this.types = this.transactionsTypes.filter(element => element.selected).map(element => element.type);
        this.statuses = this.transactionsStatuses.filter(element => element.selected).map(element => element.type);

        this.filter['types'] = this.types;
        this.filter['statuses'] = this.statuses;
    }

    /**
     * Changes type of sorting
     * @param {string} type Name of column to sort
     */
    onSort(type: string) {
        const prev = this.sort[type];
        this.sort = {};
        this.sort[type] = !prev || prev ? 'asc' : 'desc';
        this.sorting.emit({sort: this.sort});
    }

    /**
     * Searches transactions with selected types
     * @param search
     * @param filterName
     * @param listName
     * @param propName
     */
    setFilter(search, filterName, listName, propName) {
        if (search) {
            this[filterName] = [];
            this[listName].forEach(element => {
                if (element.selected) {
                    this[filterName].push(element.type);
                }
            });
            this.filter[filterName] = this[filterName];
            this.search.emit({filter: this.filter});
        }
        this[propName] = false;
    }

    onFilter(show, name) {
        setTimeout(() => this[name] = !show, 2);
    }

    /**
     * Saves filter fields saved in storage service
     */
    setToStorage() {
        this.storage.setStorage(this.tableName + this.storageName, {
            transactionsTypes: this.transactionsTypes,
            transactionsStatuses: this.transactionsStatuses,
            sort: this.sort
        });
    }

    /**
     * Returns filter fields saved in storage service
     * @returns {any}
     */
    getFromStorage() {
        const data = this.storage.getStorage(this.tableName + this.storageName);
        this.transactionsTypes = data['transactionsTypes'];
        this.transactionsStatuses = data['transactionsStatuses'];
        this.sort = data['sort'];
    }

    ngOnDestroy() {
        this.setToStorage();
    }

}
