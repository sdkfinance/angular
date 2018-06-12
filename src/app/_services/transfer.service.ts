import {Injectable} from '@angular/core';
import {URL_CONSTANTS} from '../app.url';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TransferService {
    private transferUrl: string = URL_CONSTANTS.transfers;

    constructor(private http: HttpClient) {
    }

    calculateCommissionFee(body) {
        return this.http.post(this.transferUrl + '/calculate', body).toPromise<any>();
    }

    makeTransfer(body) {
        return this.http.post(this.transferUrl, body).toPromise<any>();
    }

}
