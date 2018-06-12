import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class FormSubmittingService {

    constructor(private http: HttpClient) {
    }

    submitForm(form) {

        let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };
        const url = form.url;
        let body = new URLSearchParams();
        Object.keys(form.parameters).forEach(key => body.append(key, form.parameters[key]));
        console.log(url, body.toString()); // , options.headers
        return this.http.post(url, body, options).toPromise(); // , options
    }

}
