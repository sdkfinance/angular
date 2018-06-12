import {Injectable} from '@angular/core';
import {URL_CONSTANTS} from '../app.url';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class SmartCardsService {

    private smartCarsUrl: string = URL_CONSTANTS.smartCards;

    constructor(private http: HttpClient) {
    }

    /**
     * GET: Gets smart cards owned by current user
     * @returns {Promise<any>}
     */
    getSmartCards() {
        return this.http.get(this.smartCarsUrl).toPromise<any>();
    }

    /**
     * POST: Gets smart cards by specified filter
     * @param body - Filters
     * @returns {Promise<any>}
     */
    viewSmartCards(body) {
        return this.http.post(this.smartCarsUrl + '/view', body).toPromise<any>();
    }

    /**
     * POST: Creates a new smart card
     * @param body
     * @returns {Promise<any>}
     */
    createSmartCard(body) {
        return this.http.post(this.smartCarsUrl, body).toPromise<any>();
    }

    /**
     * PATCH: Updates an existing smart card
     * @param number - Number of smart card
     * @param body - New card data
     * @returns {Promise<any>}
     */
    updateSmartCard(number, body) {
        return this.http.patch(`${this.smartCarsUrl}/${number}`, body).toPromise<any>();
    }

    /**
     * DELETE: Deletes an existing smart card
     * @param number - Number of smart card
     * @returns {Promise<any>}
     */
    deleteSmartCard(number) {
        return this.http.delete(`${this.smartCarsUrl}/${number}`).toPromise<any>();
    }
}
