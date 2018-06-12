import {Injectable} from '@angular/core';
import {URL_CONSTANTS} from '../app.url';
import {LoyaltyRule} from '../_classes/loyalty-rule';
import {LOCAL} from '../app.constants';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class LoyaltyRulesService {
    private loyaltyRulesUrl = URL_CONSTANTS.loyaltyRules;

    constructor(private http: HttpClient) {
    }

    getLoyaltyRulesList(local: string = LOCAL): Promise<LoyaltyRule[]> {
        let headers = new HttpHeaders();
        headers.append('Accept-Language', local);
        headers.append('Content-Type', 'application/json');
        let options = {headers: headers};
        return this.http.get(this.loyaltyRulesUrl, options).map(res => {
            let result = [],
                list: any = res as any;
            for (let record of list.records) {
                result.push(new LoyaltyRule(record));
            }
            return result;
        }).toPromise();
    }

    getLoyaltyRules(body, local: string = LOCAL) {
        let headers = new HttpHeaders();
        headers.append('Accept-Language', local);
        headers.append('Content-Type', 'application/json');
        let options = {headers: headers};
        return this.http.post(`${this.loyaltyRulesUrl}/view`, body, options).toPromise<any>();

    }

    createLoyaltyRule(body) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        let options = {headers: headers};
        return this.http.post(this.loyaltyRulesUrl, body, options).toPromise<any>();
    }

    deleteLoyaltyRule(ruleId) {
        return this.http.delete(`${this.loyaltyRulesUrl}/${ruleId}`).map(res => res as any).toPromise<any>();
    }

    addIssuerToTheLoyaltyRule(ruleId: string, issuerId: string) {
        let url = `${this.loyaltyRulesUrl}/${ruleId}/issuers/${issuerId}`;
        return this.http.put(url, {}).toPromise<any>();
    }

    addLoyaltyGroupToTheLoyaltyRule(ruleId: string, loyaltyGroupId: string) {
        let url = `${this.loyaltyRulesUrl}/${ruleId}/loyalty-groups/${loyaltyGroupId}`;
        return this.http.put(url, {}).toPromise<any>();
    }

    addProductCategoryToTheLoyaltyRule(ruleId: string, categoryId: number, body) {
        let url = `${this.loyaltyRulesUrl}/${ruleId}/merchant-product-categories/${categoryId.toString()}`;
        return this.http.put(url, body).toPromise<any>();
    }

    addProductToTheLoyaltyRule(ruleId: string, productId: number, body) {
        let url = `${this.loyaltyRulesUrl}/${ruleId}/merchant-products/${productId.toString()}`;
        return this.http.put(url, body).toPromise<any>();
    }

    addPointOfSaleToTheLoyaltyRule(ruleId: string, posId: string) {
        let url = `${this.loyaltyRulesUrl}/${ruleId}/points-of-sale/${posId}`;
        return this.http.put(url, {}).toPromise<any>();
    }

    getPointsOfSaleUsedByLoyaltyRule(ruleId: string) {
        let url = `${this.loyaltyRulesUrl}/${ruleId}/points-of-sale`;
        return this.http.get(url).toPromise<any>();
    }

    getProductsUsedByLoyaltyRule(ruleId: string, local: string = LOCAL) {
        let headers = new HttpHeaders();
        headers.append('Accept-Language', local);
        headers.append('Content-Type', 'application/json');
        let options = {headers: headers};
        let url = `${this.loyaltyRulesUrl}/${ruleId}/merchant-products`;
        return this.http.get(url, options).toPromise<any>();
    }

    getLoyaltyGroupsUsedByLoyaltyRule(ruleId: string) {
        let url = `${this.loyaltyRulesUrl}/${ruleId}/loyalty-groups`;
        return this.http.get(url).toPromise<any>();
    }

    getIssuersUsedByLoyaltyRule(ruleId: string) {
        let url = `${this.loyaltyRulesUrl}/${ruleId}/issuers`;
        return this.http.get(url).toPromise<any>();
    }

    getCategoriesUsedByLoyaltyRule(ruleId: string, local: string = LOCAL) {
        let headers = new HttpHeaders();
        headers.append('Accept-Language', local);
        headers.append('Content-Type', 'application/json');
        let options = {headers: headers};
        let url = `${this.loyaltyRulesUrl}/${ruleId}/merchant-product-categories`;
        return this.http.get(url, options).toPromise<any>();
    }
}
