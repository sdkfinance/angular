import {Injectable} from '@angular/core';
import {Http, ConnectionBackend, RequestOptions, RequestOptionsArgs, Headers, Request, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AuthorizationService} from '../authorization.service';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/filter';

@Injectable()
export class SdkFinanceApiService extends Http {
    constructor(_backend: ConnectionBackend, _defaultOptions: RequestOptions, private authorizationService: AuthorizationService) {
        super(_backend, _defaultOptions);
    }

    private setHeaders(options: RequestOptionsArgs) {
        options.headers.set('Authorization', 'TOKEN ' +
            this.authorizationService.userProfile.getToken());
        // options.headers.set('Accept-Language', 'en');
    }

    private getUserToken(): Promise<string> {
        return new Promise((resolve, reject) => {
            let token;
            if (token = this.authorizationService.userProfile.getToken()) {
                resolve(token);
            } else {
                reject('');
            }
        });
    }

    private configureRequest(f: Function, url: string | Request, options: RequestOptionsArgs, body?: any): Observable<Response> {
        let tokenPromise: Promise<string> = this.getUserToken();
        let tokenObservable: Observable<string> = Observable.fromPromise(tokenPromise);

        let tokenUpdateObservable: Observable<any> = Observable.create((observer) => {
            if (options == null) {
                let headers = new Headers();
                options = new RequestOptions({headers: headers});
            }

            this.setHeaders(options);
            observer.next();
            observer.complete();
        });

        let requestObservable: Observable<Response> = Observable.create((observer) => {
            let result;
            if (body) {
                result = f.apply(this, [url, body, options]);
            } else {
                result = f.apply(this, [url, options]);
            }

            result.subscribe((response) => {
                observer.next(response);
                observer.complete();
            }, (err) => observer.error(err));
        });

        return <Observable<Response>>Observable
            .merge(tokenObservable, tokenUpdateObservable, requestObservable, 1) // Insure no concurrency in the merged Observables
            .filter((response) => response instanceof Response);
    }

    /**
     * Performs any type of http request. First argument is required, and can either be a url or
     * a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions}
     * object can be provided as the 2nd argument. The options object will be merged with the values
     * of {@link BaseRequestOptions} before performing the request.
     */
    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return this.configureRequest(super.request, url, options);
    }

    /**
     * Performs a request with `get` http method.
     */
    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.configureRequest(super.get, url, options);
    }

    /**
     * Performs a request with `post` http method.
     */
    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        // console.log('posting');
        return this.configureRequest(super.post, url, options, body);
    }

    /**
     * Performs a request with `put` http method.
     */
    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.configureRequest(super.put, url, options, body);
    }

    /**
     * Performs a request with `delete` http method.
     */
    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.configureRequest(super.delete, url, options);
    }

    /**
     * Performs a request with `patch` http method.
     */
    patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.configureRequest(super.patch, url, options, body);
    }

    /**
     * Performs a request with `head` http method.
     */
    head(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.configureRequest(super.head, url, options);
    }

    /**
     * Performs a request with `options` http method.
     */
    options(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.configureRequest(super.options, url, options);
    }
}
