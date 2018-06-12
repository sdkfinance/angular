import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class UserManagementService {

    private _userId: string;
    private userProfileSubject = new BehaviorSubject(null);
    private userAccountSubject = new BehaviorSubject(null);

    public filtersStorage;

    constructor() {
    }

    get userId() {
        return this._userId;
    }

    set userId(id) {
        this._userId = id;
    }

    getUserProfileSubject() {
        return this.userProfileSubject.asObservable();
    }

    setUserProfileSubject(user) {
        this.userProfileSubject.next(user);
    }

    getUserAccountSubject() {
        return this.userAccountSubject.asObservable();
    }

    setUserAccountSubject(user) {
        this.userAccountSubject.next(user);
    }

}
