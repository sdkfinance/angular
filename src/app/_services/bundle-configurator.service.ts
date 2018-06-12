import {Injectable} from '@angular/core';
import {URL_CONSTANTS} from '../app.url';
import {Subject} from 'rxjs/Subject';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class BundleConfiguratorService {
    bundleUrl: string = URL_CONSTANTS.bundleConfigurator;

    bundleSubject: Subject<any> = new Subject();

    lastBody = null;

    constructor(private http: HttpClient) {
    }

    createBundle(body) {
        return this.http.post(this.bundleUrl, body).toPromise<any>();
    }

    viewBundles(body) {
        return this.http.post(`${this.bundleUrl}/view`, body).toPromise<any>();
    }

    deleteBundle(id: string) {
        return this.http.delete(`${this.bundleUrl}/${id}`).toPromise<any>();
    }

    updateBundle(id: string, body) {
        return this.http.patch(`${this.bundleUrl}/${id}`, body).toPromise<any>();
    }

    getBundles() {
        return this.bundleSubject.asObservable();
    }

    updateBundles(body?) {
        if (body) {
            this.lastBody = body;
        }
        this.viewBundles(this.lastBody)
            .then(data => this.bundleSubject.next(data))
            .catch(error => this.bundleSubject.next({
                records: [],
                totalPages: 0,
            }));
    }

    downloadInFile() {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const options = {responseType: 'blob' as 'blob'};
        return this.http.post(`${this.bundleUrl}/export`, {}, options).toPromise();
    }
}
