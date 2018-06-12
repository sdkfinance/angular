import {Injectable} from '@angular/core';
import {URL_CONSTANTS} from '../app.url';
import {Client} from '../_classes/client';
import {CommonPage} from './page-state/common-page';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class ClientsService extends CommonPage<Client> {

    usersUrl: string = URL_CONSTANTS.clients;
    profilesUrl: string = URL_CONSTANTS.profiles;

    constructor(private http: HttpClient) {
        super(http, URL_CONSTANTS.clients + '/view');
    }

    getSmartCard(organizationId, body?) {
        body = body || {
            'filter': {
                'organizationIds': [organizationId]
            },
            'sort': {
                'date': 'asc'
            },
            'pageNumber': 0,
            'pageSize': 5
        };
        return this.http.post(URL_CONSTANTS.smartCards + '/view', body).toPromise<any>();
    }

    createClient(createBody) {
        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        let options = {headers: headers};
        return this.http.post(URL_CONSTANTS.createClient, createBody, options).toPromise<any>();
    }

    updateClient(clientId, body) {
        return this.http.patch(`${this.usersUrl}/${clientId}`, body).toPromise<any>();
    }

    getUserProfileById(userId) {
        return this.http.get(`${this.profilesUrl}/${userId}`).toPromise<any>();
    }

    updatePersonInfoById(userId: string, body) {
        return this.http.patch(`${this.profilesUrl}/${userId}/person`, body).toPromise<any>();
    }

    resetUserPassword(userId: string) {
        return this.http.post(`${this.profilesUrl}/${userId}/reset-password`, {}).toPromise<any>();
    }

    getUsers(body) {
        return this.http.post(`${this.usersUrl}/view`, body).toPromise<any>();
    }

    createUser(body) {
        return this.http.post(this.usersUrl, body).toPromise<any>();
    }

    deleteUserById(id) {
        return this.http.delete(`${this.usersUrl}/${id}`).toPromise<any>();
    }


}
