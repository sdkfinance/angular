import {Injectable} from '@angular/core';
import {URL_CONSTANTS} from '../app.url';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ProfileDocumentsService {

    private docUrl: string = URL_CONSTANTS.profileDocuments;

    constructor(private http: HttpClient) {
    }

    /**
     * POST: gets list of profile documents with specified filters
     * @param body - Filters
     * @returns {Promise<any>}
     */
    viewAllProfileDocuments(body) {
        return this.http.post(`${this.docUrl}/view`, body).toPromise<any>();
    }

    /**
     * POST: approves the profile document with specified ID
     * @param id - Document ID
     * @returns {Promise<any>}
     */
    approveTheProfileDocument(id) {
        return this.http.post(`${this.docUrl}/${id}/approve`, {}).toPromise<any>();
    }

    /**
     * POST: declines the profile document with specified ID
     * @param id - Document ID
     * @returns {Promise<any>}
     */
    declineTheProfileDocument(id) {
        return this.http.post(`${this.docUrl}/${id}/decline`, {}).toPromise<any>();
    }


}
