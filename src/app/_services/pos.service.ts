import {Injectable} from '@angular/core';
import {URL_CONSTANTS} from '../app.url';
import {Pos} from '../_classes/pos';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PosService {
    private posUrl: string = URL_CONSTANTS.pos;
    private posSubj: Subject<Pos> = new Subject();
    private posListUpdater: Subject<Pos[]> = new Subject();
    public posObs: Observable<Pos> = this.posSubj.asObservable();
    public posListUpdates: Observable<Pos[]> = this.posListUpdater.asObservable();

    posLength: number;

    public setLocalPOS(pos: Pos) {
        this.posSubj.next(pos);
    }

    constructor(private http: HttpClient) {
    }

    sendAction(pos: Pos) {
        if (pos.id != null && pos.id !== '') {
            this.posSubj.next(pos);
        } else {
            this.posSubj.next(new Pos());

        }
    }

    getAction() {
        return this.posObs;
    }

    updatePosList(): void {
        this.http.get(this.posUrl).map((data) => data as any).map(this.mapPos.bind(this)).toPromise().then((data) => {
        });
    }

    getPosList() {
        return this.http.get(this.posUrl).map((data) => data as any).map(this.mapPos.bind(this)).toPromise();
    }

    createPos(pos: Pos) {
        return this.http.post(this.posUrl, pos.createBody()).toPromise<any>();
    }

    updatePos(pos: Pos) {
        return this.http.patch(`${this.posUrl}/${pos.id.toString()}`, pos.createBody()).toPromise<any>();
    }

    deletePos(posId) {
        return this.http.delete(`${this.posUrl}/${posId.toString()}`).toPromise<any>();
    }

    getPosDetails(posId, body) {
        return this.http.post(`${this.posUrl}/${posId.toString()}/transactions/view`, body).toPromise<any>();
    }

    getInfoAboutPos(posId) {
        return this.http.get(`${this.posUrl}/${posId}`).toPromise<any>();
    }

    mapPos(data): Pos[] {
        let result: Pos[] = [];
        if (data.status === 'ok') {
            for (let posElement of data.records) {
                result.push(new Pos(posElement));
            }
            this.posListUpdater.next(result);
            this.posLength = result.length;
            return result;
        }
    }

    mapPosDetails(data) {
        if (data.status === 'ok') {
            return data.records;
        }

    }
}
