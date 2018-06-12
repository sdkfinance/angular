import {Injectable} from '@angular/core';
import {URL_CONSTANTS} from '../app.url';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CashInputsService {

    inputsUrl: string = URL_CONSTANTS.inputs;

    constructor(private http: HttpClient) {
    }

    /**
     * POST: Inputs collected cash to cash desk
     * @param body
     * @returns {Promise<any>}
     */
    inputCash(body) {
        return this.http.post(this.inputsUrl, body).toPromise<any>();
    }

    /**
     * GET: Views cash input details
     * @param id
     * @returns {Promise<any>}
     */
    viewInputDetails(id) {
        return this.http.get(`${this.inputsUrl}/${id}`).toPromise<any>();
    }

    /**
     * POST: Accepts input request
     * @param id
     * @param {{}} body
     * @returns {Promise<any>}
     */
    acceptInputRequest(id, body = {}) {
        return this.http.post(`${this.inputsUrl}/${id}/accept`, body).toPromise<any>();
    }

}
