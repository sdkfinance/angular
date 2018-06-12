import {XHRBackend, RequestOptions, Http} from '@angular/http';
import {AuthorizationService} from '../authorization.service';
import {SdkFinanceApiService} from './token-http';

export function httpFactory(backend: XHRBackend,
                            defaultOptions: RequestOptions,
                            authorizationService: AuthorizationService) {
    return new SdkFinanceApiService(backend, defaultOptions, authorizationService);
}

export let HTTP_INTERCEPTOR = {
    provide: Http, useFactory: httpFactory,
    deps: [XHRBackend, RequestOptions, AuthorizationService]
};
