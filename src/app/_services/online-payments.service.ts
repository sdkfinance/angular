import {Injectable} from '@angular/core';
import {URL_CONSTANTS} from '../app.url';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class OnlinePaymentsService {

    private url: string = URL_CONSTANTS.gate;

    constructor(private http: HttpClient) {
    }

    viewProducts(body) {
        return this.http.post(this.url + '/products/view', body).toPromise<any>();
    }

    calculateCommission(body) {
        return this.http.post(this.url + '/purchases/calculate', body).toPromise<any>();
    }

    createPurchase(body) {
        return this.http.post(this.url + '/purchases', body).toPromise<any>();
    }

    getListOfFields(id) {
        return this.http.get(`${this.url}/transactions/${id}/payer-fields`).toPromise<any>();
    }

    makeTransaction(id, body) {
        return this.http.post(`${this.url}/transactions/${id}/submit`, body).toPromise<any>();
    }
}
