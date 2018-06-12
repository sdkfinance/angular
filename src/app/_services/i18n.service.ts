import {Injectable} from '@angular/core';
import {URL_CONSTANTS} from '../app.url';
import {I18N_LOCALES} from '../app.constants';
import {AuthorizationService} from './authorization.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class I18nService {

    bundleUrl: string = URL_CONSTANTS.bundleConfigurator;
    /** Selected locale */
    currentLocale;

    /** List of bundles */
    locales;

    private _localesIsLoadedSubject = new BehaviorSubject(false);

    constructor(private http: HttpClient) {
        this.currentLocale = JSON.parse(localStorage.getItem('locale')) || I18N_LOCALES[0];
    }

    /**
     * GET: View all I18n records by locale
     * @param locale
     * @returns {Promise<any>}
     */
    getBundlesByLocale(locale) {
        return this.http.get(`${this.bundleUrl}/${locale}`).toPromise<any>();
    }

    /**
     * Returns selected locale
     * @returns {any}
     */
    getCurrentLocale() {
        return this.currentLocale;
    }

    /**
     * Sets selected locale
     * @param locale
     */
    setCurrentLocale(locale) {
        this.currentLocale = locale;
        localStorage.setItem('locale', JSON.stringify(this.currentLocale));
        this.setLocales();
    }

    /**
     * Makes a request to get I18n records
     */
    setLocales() {
        this._localesIsLoadedSubject.next(false);
        this.getBundlesByLocale(this.currentLocale.locale).then(data => {
            data.records.forEach(record => this.locales[record.key] = record.values[0].value);
            localStorage.setItem('i18n', JSON.stringify(this.locales));
            this._localesIsLoadedSubject.next(true);
        }).catch();
    }

    get localesIsLoadedSubject(): Observable<boolean> {
        return this._localesIsLoadedSubject.asObservable();
    }

    initLocales() {
        this.locales = JSON.parse(localStorage.getItem('i18n'));
        if (!this.locales) {
            this.locales = {};
            this.setLocales();
        } else {
            this._localesIsLoadedSubject.next(true);
        }
    }
}
