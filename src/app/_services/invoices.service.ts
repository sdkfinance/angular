import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {URL_CONSTANTS} from '../app.url';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class InvoicesService {

    private invoicesUrl: string = URL_CONSTANTS.invoices;

    private invoiceSubject = new Subject();
    lastBody;
    storage;

    constructor(private http: HttpClient) {
    }

    /**
     * POST: Views invoices
     * @param body
     * @returns {Promise<any>}
     */
    getInvoices(body) {
        return this.http.post(`${this.invoicesUrl}/view`, body).toPromise<any>();
    }

    /**
     * DELETE: Deletes invoice
     * @param id - id of invoice to delete
     * @returns {Promise<any>}
     */
    deleteInvoice(id) {
        return this.http.delete(`${this.invoicesUrl}/${id}`).toPromise<any>();
    }

    /**
     * POST: Calculates commission for specified invoice as payer
     * @param id
     * @param body
     * @returns {Promise<any>}
     */
    calculateCommissionAsPayer(id, body) {
        return this.http.post(`${this.invoicesUrl}/${id}/calculate`, body).toPromise<any>();
    }

    /**
     * POST: Calculates commission for invoice as merchant
     * @param body
     * @returns {Promise<any>}
     */
    calculateCommissionAsMerchant(body) {
        return this.http.post(`${this.invoicesUrl}/calculate`, body).toPromise<any>();
    }

    /**
     * Creates an invoice
     * @param body
     * @returns {Promise<any>}
     */
    createInvoice(body) {
        return this.http.post(`${this.invoicesUrl}`, body).toPromise<any>();
    }

    /**
     * POST:
     * @param id
     * @param body
     * @returns {Promise<any>}
     */
    payForInvoice(id, body) {
        return this.http.post(`${this.invoicesUrl}/${id}/pay`, body).toPromise<any>();
    }

    /**
     * GET: Gets information about invoice by identifier
     * @param id
     * @returns {Promise<any>}
     */
    getInvoice(id) {
        return this.http.get(`${this.invoicesUrl}/${id}`).toPromise<any>();
    }

    getInvoiceSubject() {
        return this.invoiceSubject.asObservable();
    }

    updateInvoiceSubject(body?) {
        if (body) {
            this.lastBody = body;
        }
        this.getInvoices(this.lastBody).then(data => this.invoiceSubject.next(data)).catch();
    }

}
