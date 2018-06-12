import {Injectable} from '@angular/core';
import {URL_CONSTANTS} from '../app.url';
import {LOCAL} from '../app.constants';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class CategoriesService {
    categoriesUrl = URL_CONSTANTS.categories;

    constructor(private http: HttpClient) {
    }

    getCategories(local: string = LOCAL) {
        const headers = new HttpHeaders();
        headers.append('Accept-Language', local);
        headers.append('Content-Type', 'application/json');
        const options = {headers: headers};
        return this.http.get(this.categoriesUrl, options).toPromise<any>();
    }
}
