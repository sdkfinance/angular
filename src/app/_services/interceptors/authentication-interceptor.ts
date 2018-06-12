import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {AuthorizationService} from '../authorization.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor(private authorizationService: AuthorizationService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // request.headers.append('Authorization', 'TOKEN ' + this.authorizationService.userProfile.getToken());

        request = request.clone({
            setHeaders: {
                Authorization: 'TOKEN ' + this.authorizationService.userProfile.getToken()
            }
        });
        return next.handle(request);
    }
}
