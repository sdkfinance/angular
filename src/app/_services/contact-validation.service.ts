import {Injectable} from '@angular/core';
import {URL_CONSTANTS} from '../app.url';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ContactValidationService {

    private contactUrl: string = URL_CONSTANTS.contacts;

    constructor(private http: HttpClient) {
    }

    /**
     * POST: Validates a contact
     * @param body
     * @returns {Promise<Object>}
     */
    validateContact(body) {
        return this.http.post(`${this.contactUrl}/validate`, body).toPromise();
    }
}
