import {Injectable} from '@angular/core';
import {URL_CONSTANTS} from '../app.url';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {LOCAL} from '../app.constants';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class ProductsService {
    private productsUrl = URL_CONSTANTS.products;
    private measureUrl = URL_CONSTANTS.measure;
    private productsSubject: Subject<any> = new Subject();
    private lastBody;

    constructor(private http: HttpClient) {
    }

    getProductsList(body, local: string = LOCAL) {
        let headers = new HttpHeaders();
        headers.append('Accept-Language', local);
        headers.append('Content-Type', 'application/json');
        let options = {headers: headers};
        return this.http.post(`${this.productsUrl}/view`, JSON.stringify(body), options).toPromise<any>();
    }

    createProduct(body) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        let options = {headers: headers};
        return this.http.post(this.productsUrl, JSON.stringify(body), options).toPromise<any>();
    }

    getMeasureUnits(local: string = LOCAL): Promise<any> {
        let headers = new HttpHeaders();
        headers.append('Accept-Language', local);
        headers.append('Content-Type', 'application/json');
        let options = {headers: headers};
        return this.http.get(this.measureUrl, options).toPromise<any>();
    }

    createMeasureUnit(body) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        let options = {headers: headers};
        return this.http.post(this.measureUrl, JSON.stringify(body), options).toPromise<any>();
    }

    getProducts(): Observable<any> {
        return this.productsSubject.asObservable();
    }

    updateProducts(body?) {
        if (body) {
            this.lastBody = body;
        }

        this.getProductsList(this.lastBody).then(res => this.productsSubject.next(res));
    }
}
