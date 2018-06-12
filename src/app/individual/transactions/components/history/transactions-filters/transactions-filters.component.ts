import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {BsDatepickerConfig, BsLocaleService} from 'ngx-bootstrap/datepicker';
import {defineLocale} from 'ngx-bootstrap/chronos';
import * as BsLocale from 'ngx-bootstrap/locale';
import {I18nService} from '../../../../../_services/i18n.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TransactionsStorageService} from '../../../services/transactions-storage.service';

@Component({
    selector: 'app-transactions-filters',
    templateUrl: './transactions-filters.component.html',
    styleUrls: ['./transactions-filters.component.less']
})
export class TransactionsFiltersComponent implements OnInit, OnDestroy {

    @Input() tableName;
    @Output() search = new EventEmitter();

    storageName = 'transactions-filters';
    /** Form with filter fields */
    form: FormGroup;
    /**  */
    filter = {};
    /** Current date */
    today = new Date();

    bsConfig: Partial<BsDatepickerConfig>;

    constructor(private _localeService: BsLocaleService,
                private i18nService: I18nService,
                private fb: FormBuilder,
                private storage: TransactionsStorageService) {
    }

    ngOnInit() {
        defineLocale(this.i18nService.currentLocale.bsDatePickerConfig.locale,
            BsLocale[this.i18nService.currentLocale.bsDatePickerConfig.param]);
        this._localeService.use(this.i18nService.currentLocale.bsDatePickerConfig.locale);

        this.createForm(this.getFromStorage());
    }


    createForm({code = '', dateFrom = null, dateTo = null}) {
        this.form = this.fb.group({
            code: code,
            dateFrom: dateFrom,
            dateTo: dateTo
        });
    }

    /**
     * Searches transactions with specified filters
     */
    onSearch() {
        const filter = {};
        if (this.form.get('code').value) {
            filter['ids'] = [this.form.get('code').value];
        }

        if (this.form.get('dateFrom').value) {
            let from: Date = this.form.get('dateFrom').value;
            from = new Date(from.getFullYear(), from.getMonth(), from.getDate());
            filter['dateFrom'] = from.toISOString();
        }

        if (this.form.get('dateTo').value) {
            let to: Date = this.form.get('dateTo').value;
            to = new Date(to.getFullYear(), to.getMonth(), to.getDate() + 1);
            filter['dateTo'] = to.toISOString();
        }

        this.search.emit({filter: filter});
    }

    /**
     * Resets filters
     */
    onReset() {
        this.form.reset();
        this.filter = {};
        this.search.emit({
            filter: {
                ids: null,
                dateFrom: null,
                dateTo: null
            }
        });
    }

    /**
     * Saves filter fields saved in storage service
     */
    setToStorage() {
        this.storage.setStorage(this.tableName + this.storageName, {
            code: this.form.get('code').value,
            dateFrom: this.form.get('dateFrom').value,
            dateTo: this.form.get('dateTo').value
        });
    }

    /**
     * Returns filter fields saved in storage service
     * @returns {any}
     */
    getFromStorage() {
        const data = this.storage.getStorage(this.tableName + this.storageName);

        return data ? {
            code: data['code'],
            dateFrom: data['dateFrom'],
            dateTo: data['dateTo']
        } : {};
    }

    ngOnDestroy() {
        this.setToStorage();
    }

}
