import {Injectable} from '@angular/core';
import {URL_CONSTANTS} from '../app.url';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class BankService {

    private bankUrl: string = URL_CONSTANTS.bank;
    private _bank;

    constructor(private http: HttpClient) {
    }

    getBankAccounts() {
        return this.http.get(this.bankUrl).toPromise<any>();
    }

    createBankAccount(body) {
        return this.http.post(this.bankUrl, body).toPromise<any>();
    }

    updateBankAccount(id, body) {
        return this.http.patch(`${this.bankUrl}/${id}`, body).toPromise<any>();
    }

    deleteBankAccount(id) {
        return this.http.delete(`${this.bankUrl}/${id}`).toPromise<any>();
    }

    get bank() {
        return this._bank;
    }

    set bank(bank) {
        this._bank = bank;
    }
}
