import {Injectable} from '@angular/core';
import {URL_CONSTANTS} from '../app.url';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CardService {

    private cardUrl: string = URL_CONSTANTS.gate;

    constructor(private http: HttpClient) {
    }

    getCards() {
        return this.http.get(`${this.cardUrl}/cards`).toPromise<any>();
    }

    getAttachmentMethods() {
        return this.http.get(`${this.cardUrl}/card-attachment-requests/methods`).toPromise<any>();
    }

    attachCard(body) {
        return this.http.post(`${this.cardUrl}/card-attachment-requests`, body).toPromise<any>();
    }

    confirmCardAttachment(id: string, body) {
        return this.http.post(`${this.cardUrl}/card-attachment-requests/${id}/confirm`, body).toPromise<any>();
    }

    deleteCard(cardId) {
        return this.http.delete(`${this.cardUrl}/cards/${cardId}`).toPromise<any>();
    }
}
