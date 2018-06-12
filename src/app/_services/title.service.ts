import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class TitleService {

    static title: Subject<string> = new Subject();

    constructor() {
    }

    static getTitle() {
        return this.title.asObservable();
    }

    static setTitle(title: string) {
        this.title.next(title);
    }

}
