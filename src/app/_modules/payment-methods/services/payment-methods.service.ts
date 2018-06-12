import {Injectable} from '@angular/core';

@Injectable()
export class PaymentMethodsService {

    private _transaction: number;

    constructor() {
    }

    get transaction(): number {
        return this._transaction;
    }

    set transaction(value: number) {
        this._transaction = value;
    }

}
