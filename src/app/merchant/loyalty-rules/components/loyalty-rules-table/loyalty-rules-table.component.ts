import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {LoyaltyRule} from '../../../../_classes/loyalty-rule';
import {LoyaltyRulesService} from '../../../../_services/loyalty-rules.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-loyalty-rules-table',
    templateUrl: './loyalty-rules-table.component.html',
    styleUrls: ['./loyalty-rules-table.component.less']
})
export class LoyaltyRulesTableComponent implements OnInit {
    loyaltyRules: LoyaltyRule[];

    @Output() loyaltyRuleUpdate = new EventEmitter();

    totalPages: number;
    currentPage: number;
    pageSize: number = 20;
    totalRecords: number;
    pageNumber: number = 0;

    filter = null;

    sort = {
        startsAt: 'asc'
    };

    sortInfo = {
        sortDate: true,
        sortDateAsc: true,

    };

    filters: FormGroup;

    constructor(private loyaltyRulesService: LoyaltyRulesService, private fb: FormBuilder) {
    }

    ngOnInit() {
        this.getLoyaltyRules();

        this.filters = this.fb.group({
            'filter': ['all']
        });

        this.filters.get('filter').valueChanges.subscribe(data => {
            if (data == 'all') this.onAll();
            if (data == 'active') this.onActive();
            if (data == 'inactive') this.onInactive();
        })
    }

    getLoyaltyRules() {
        let body = {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            sort: this.sort,
            filter: this.filter
        };
        this.loyaltyRulesService.getLoyaltyRules(body).then(response => {
            this.loyaltyRules = response.records;
            this.totalRecords = response.totalRecords;
            this.totalPages = (<any>response).totalPages;
            this.currentPage = (<any>response).pageNumber;
        }).catch()
    };


    onNextPage() {
        this.pageNumber = this.currentPage + 1;
        this.getLoyaltyRules();
    }

    onPreviousPage() {
        this.pageNumber = this.currentPage - 1;
        this.getLoyaltyRules();
    }


    updateRules() {
        this.loyaltyRuleUpdate.emit();
        if (this.loyaltyRules.length < 2 && this.pageNumber > 0) this.pageNumber--;
        this.getLoyaltyRules();
    }


    onSortDate() {
        this.pageNumber = 0;
        this.sortInfo.sortDate = true;
        this.sortInfo.sortDateAsc = !this.sortInfo.sortDateAsc;
        this.sort.startsAt = this.sortInfo.sortDateAsc ? 'asc' : 'desc';
        this.getLoyaltyRules();
    }

    onAll() {
        this.filter = null;
        this.pageNumber = 0;
        this.getLoyaltyRules();
    }

    onActive() {
        this.filter =  {
            active: true
        };
        this.pageNumber = 0;
        this.getLoyaltyRules();
    }

    onInactive() {
        this.filter =  {
            active: false
        };
        this.pageNumber = 0;
        this.getLoyaltyRules();
    }

}
