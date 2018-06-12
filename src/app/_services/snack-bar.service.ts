import {Injectable} from '@angular/core';

@Injectable()
export class SnackBarService {
    message: string = '';
    action: string = '';

    constructor() {
    }

    setMessage(msg) {
        this.message = msg;
    }

    getMessage() {
        return this.message;
    }

    setAction(action) {
        this.action = action;
    }

    getAction() {
        return this.action;
    }

}
