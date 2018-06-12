import {Injectable} from '@angular/core';
import {URL_CONSTANTS} from '../app.url';
import {LoyaltyGroup} from '../_classes/loyalty-group';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class LoyaltyGroupsService {
    private loyaltyGroupsUrl = URL_CONSTANTS.loyaltyGroup;

    constructor(private http: HttpClient) {
    }

    private loyaltyGroupsSubject: Subject<LoyaltyGroup[]> = new Subject();

    getLoyaltyGroupsFromHttp(): Promise<LoyaltyGroup[]> {
        return this.http.get(this.loyaltyGroupsUrl).map((res: any) => {
            let result: LoyaltyGroup[] = [],
                list: any = res as any;
            for (let record of list.records) {
                result.push(new LoyaltyGroup(<LoyaltyGroup>record));
            }
            return result;
        }).toPromise<any>();
    }

    getLoyaltyGroups(): Observable<any> {
        return this.loyaltyGroupsSubject.asObservable();
    }

    updateLoyaltyGroups() {
        this.getLoyaltyGroupsFromHttp().then(res => this.loyaltyGroupsSubject.next(res));
    }

    createLoyaltyGroupsRequest(requestString: string) {
        return new Promise<boolean>((resolve, reject) => {
            try {
                const body = JSON.parse(requestString);
                this.http.post(this.loyaltyGroupsUrl, body).map(res => {
                }).toPromise()
                    .then((data) => {
                        resolve(true);
                        this.updateLoyaltyGroups();
                    })
                    .catch(() => resolve(false));
            } catch (e) {
                resolve(false);
            }
        });
    }

    deleteLoyaltyGroup(groupId: string) {
        return this.http.delete(`${this.loyaltyGroupsUrl}/${groupId}`).toPromise<any>();
    }
}
