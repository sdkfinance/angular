import {Injectable} from '@angular/core';
import {Issuer} from '../../../_interfaces/issuer';

@Injectable()
export class IssuerService {

    private _issuer: Issuer;

    constructor() {
    }

    get issuer(): Issuer {
        return this._issuer;
    }

    set issuer(issuer: Issuer) {
        this._issuer = issuer;
    }
}
