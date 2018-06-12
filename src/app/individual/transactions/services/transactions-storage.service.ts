import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TransactionsStorageService {

    private storage = {
        dailyTransactions: null
    };

    constructor() {
    }

    setStorage(name, data) {
        this.storage[name] = data;
    }

    getStorage(name) {
        return this.storage[name];
    }

    clearStorage(name) {
        this.storage[name] = null;
    }
}
