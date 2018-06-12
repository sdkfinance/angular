import {Injectable} from '@angular/core';
import {URL_CONSTANTS} from '../app.url';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CashCollectsService {

    collectUrl: string = URL_CONSTANTS.collects;

    constructor(private http: HttpClient) {
    }

    /**
     * POST: Creates cash collect request
     * @param body
     * @returns {Promise<any>}
     */
    createCollectRequest(body) {
        return this.http.post(this.collectUrl, body).toPromise<any>();
    }

    /**
     * GET: Views transaction details
     * @returns {Promise<any>}
     */
    viewCollectDetails(id) {
        return this.http.get(`${this.collectUrl}/${id}`).toPromise<any>();
    }

    /**
     * POST: Accepts cash collect request
     * @param id
     * @param {{}} body
     * @returns {Promise<any>}
     */
    acceptCollectRequest(id, body = {}) {
        return this.http.post(`${this.collectUrl}/${id}/accept`, body).toPromise<any>();
    }

}
