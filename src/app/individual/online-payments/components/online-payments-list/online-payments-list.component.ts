import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ONLINE_PAYMENTS_CATEGORIES, PAGE_TITLES, WINDOW_TITLE} from '../../../../app.constants';
import {Pagination} from '../../../../_services/page-state/pagination';
import {OnlinePaymentsService} from '../../../../_services/online-payments.service';
import {TitleService} from '../../../../_services/title.service';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-online-payments-list',
    templateUrl: './online-payments-list.component.html',
    styleUrls: ['./online-payments-list.component.less']
})
export class OnlinePaymentsListComponent extends Pagination implements OnInit {

    /** Selected service category */
    serviceCategory;
    /** List of services in the category */
    services = null;

    constructor(private route: ActivatedRoute, private paymentsService: OnlinePaymentsService, private titleService: Title) {
        super();
        this.titleService.setTitle(PAGE_TITLES.payments);
        TitleService.setTitle(WINDOW_TITLE.payments);
    }

    /**
     * Gets name of the category from route and gets list of services
     */
    ngOnInit() {
        this.route.params.subscribe(params => {
            let category: string = params['category'].toUpperCase();
            this.getServices(category);
            this.serviceCategory = ONLINE_PAYMENTS_CATEGORIES.find(el => el.category == category);
            // if (!this.serviceCategory)
        });
    }

    /**
     * Gets services in the category from API
     * @param category Name of selected category
     */
    getServices(category) {
        this.paymentsService.viewProducts({
            filter: {
                category: category
            },
            pageNumber: this.page,
            pageSize: this.size
        }).then(data => {
            this.page = data.pageNumber;
            this.totalPages = data.totalPages;
            this.services = data.records;
        }).catch(() => this.services = []);
    }

    /**
     * Changes current page
     * @param page Selected page
     */
    onPagination(page) {
        this.page = page;
        this.getServices(this.serviceCategory.category);
    }
}
