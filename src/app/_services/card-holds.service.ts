import {Injectable} from '@angular/core';
import {URL_CONSTANTS} from '../app.url';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CardHoldsService {

    private holdsUrl: string = URL_CONSTANTS.cardHolds;

    constructor(private http: HttpClient) {
    }

    /**
     * POST: Creates card hold for an invoice
     * @param body
     * @returns {Promise<Response>}
     */
    createCardHoldWithCard(body) {
        return this.http.post(`${this.holdsUrl}/create-hold-for-invoice`, body).toPromise<any>();
    }

    /**
     * POST: Creates card hold for an invoice with new card
     * @param body
     * @returns {Promise<Response>}
     */
    createCardHoldWithNewCard(body) {
        return this.http.post(`${this.holdsUrl}/create-hold-for-invoice-with-new-card`, body).toPromise<any>();
    }

    /**
     * GET: Views invoice hold payment settings
     * @param invoiceId
     * @returns {Promise<Response>}
     */
    viewInvoiceHoldPaymentSettings(invoiceId) {
        return this.http.get(`${this.holdsUrl}/invoice/${invoiceId}/hold-settings`).toPromise<any>();
    }

    /**
     * POST: Adds invoice hold payment settings
     * @param invoiceId
     * @param body
     * @returns {Promise<Response>}
     */
    addInvoiceHoldPaymentSettings(invoiceId, body) {
        return this.http.post(`${this.holdsUrl}/invoice/${invoiceId}/hold-settings`, body).toPromise<any>();
    }

    /**
     * POST: Views list of card hold items
     * @param body
     * @returns {Promise<Response>}
     */
    viewCardHoldItems(body) {
        return this.http.post(`${this.holdsUrl}/view`, body).toPromise<any>();
    }

    /**
     * POST: Captures card hold
     * @param id
     * @returns {Promise<Response>}
     */
    captureCardHold(id) {
        return this.http.post(`${this.holdsUrl}/${id}/capture`, {}).toPromise<any>();
    }

    /**
     * POST: Releases card hold
     * @param id
     * @returns {Promise<Response>}
     */
    releaseCardHold(id) {
        return this.http.post(`${this.holdsUrl}/${id}/release`, {}).toPromise<any>();
    }

}
