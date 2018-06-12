import {Injectable} from '@angular/core';
import {URL_CONSTANTS} from '../app.url';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class InvoiceTemplatesService {

    private templatesUrl: string = URL_CONSTANTS.invoiceTemplates;

    constructor(private http: HttpClient) {
    }

    /**
     * POST: Creates an invoice template
     * @param body
     * @returns {Promise<any>}
     */
    createTemplate(body) {
        return this.http.post(`${this.templatesUrl}`, body).toPromise<any>();
    }

    /**
     * POST: Views invoice templates
     * @returns {Promise<any>}
     */
    getTamplates() {
        return this.http.post(`${this.templatesUrl}/view`, {}).toPromise<any>();
    }

    /**
     * PATCH: Deletes an invoice template
     * @param {string} id
     * @param body
     * @returns {Promise<any>}
     */
    updateTempalte(id: string, body) {
        return this.http.patch(`${this.templatesUrl}/${id}`, body).toPromise<any>();
    }

    /**
     * DELETE: Updates invoice template
     * @param {string} id
     * @returns {Promise<any>}
     */
    deleteTemplate(id: string) {
        return this.http.delete(`${this.templatesUrl}/${id}`).toPromise<any>();
    }

}
