import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URL_CONSTANTS} from '../app.url';

@Injectable()
export class GateInvestmentService {

    private gateInvestmentUrl: string = URL_CONSTANTS.gateInvestment;

    constructor(private http: HttpClient) {
    }

    /**
     * POST: Top up of system provider coin
     * @param body
     * @returns {Promise<any>}
     */
    createInvestmentRequest(body) {
        return this.http.post(this.gateInvestmentUrl, body).toPromise<any>();
    }

    /**
     * GET: View cash investment details
     * @param id
     * @returns {Promise<any>}
     */
    viewInvestmentRequest(id) {
        return this.http.get(`${this.gateInvestmentUrl}/${id}`).toPromise<any>();
    }

    /**
     * POST: Accept investment request
     * @param id
     * @param {{}} body
     * @returns {Promise<any>}
     */
    acceptInvestmentRequest(id, body = {}) {
        return this.http.post(`${this.gateInvestmentUrl}/${id}/accept`, body).toPromise<any>();
    }
}
