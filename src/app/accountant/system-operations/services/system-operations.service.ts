import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class SystemOperationsService {

    organizationId = new BehaviorSubject(null);

    constructor() {
    }

    getOrganizationId() {
        return this.organizationId.asObservable();
    }

    setOrganizationId(id) {
        this.organizationId.next(id);
    }

}
