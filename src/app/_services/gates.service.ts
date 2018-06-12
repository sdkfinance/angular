import {Injectable} from '@angular/core';
import {URL_CONSTANTS} from '../app.url';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class GatesService {

    private gateUrl: string = URL_CONSTANTS.gate;

    constructor(private http: HttpClient) {
    }

    /**
     * POST: Step 1: retrieve list of payment providers for transaction with specified parameters
     * @param body
     * @returns {Promise<any>}
     */
    getProviders(body) {
        return this.http.post(this.gateUrl + '/methods/view', body).toPromise<any>();
    }

    /**
     * POST: Step 2: calculate commission for execution of transaction with specified parameters
     * @param body
     * @returns {Promise<any>}
     */
    calculateCommission(body) {
        return this.http.post(this.gateUrl + '/transactions/calculate', body).toPromise<any>();
    }

    /**
     * POST: Step 3: create a transaction
     * @param body
     * @returns {Promise<any>}
     */
    createTransaction(body) {
        return this.http.post(this.gateUrl + '/transactions', body).toPromise<any>();
    }

    /**
     * GET: Step 4: retrieve list of payer fields request by payment provider
     * @param id
     * @returns {Promise<any>}
     */
    getFields(id) {
        return this.http.get(`${this.gateUrl}/transactions/${id}/payer-fields`).toPromise<any>();
    }

    /**
     * POST: Step 5: submit payer data and send gate transaction to payment provider
     * @param id
     * @param body
     * @returns {Promise<any>}
     */
    makeTransaction(id, body) {
        return this.http.post(`${this.gateUrl}/transactions/${id}/submit`, body).toPromise<any>();
    }

    /**
     * GET: Step 6: get transaction state
     * @param id
     * @returns {Promise<any>}
     */
    getTransaction(id) {
        return this.http.get(`${this.gateUrl}/transactions/${id}`).toPromise<any>();
    }

    /**
     * POST: Filter transactions
     * @param body
     * @returns {Promise<any>}
     */
    getTransactions(body) {
        return this.http.post(`${this.gateUrl}/transactions/view`, body).toPromise<any>();
    }
}
