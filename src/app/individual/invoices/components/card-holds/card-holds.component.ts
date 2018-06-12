import {Component, OnInit} from '@angular/core';
import {CardHoldsService} from '../../../../_services/card-holds.service';
import {Pagination} from '../../../../_services/page-state/pagination';
import {CardHoldItem} from '../../../../_interfaces/card-hold-item';
import {PAGE_TITLES, WINDOW_TITLE} from '../../../../app.constants';
import {TitleService} from '../../../../_services/title.service';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-card-holds',
    templateUrl: './card-holds.component.html',
    styleUrls: ['./card-holds.component.less']
})
export class CardHoldsComponent extends Pagination implements OnInit {

    /** List of card hold items */
    holds: CardHoldItem[];
    /** Filters for request*/
    filter = {
        ids: [],
        statuses: null
    };
    /** Sorts for request */
    sort: any = {
        date: 'desc',
        status: null
    };
    /** If statuses filter box is shown */
    showStatuses: boolean = false;
    /** List of possible card hold statuses */
    statuses: any[] = [
        {
            type: 'INITIAL',
            description: 'Initial',
            selected: true
        },
        {
            type: 'PENDING',
            description: 'Pending',
            selected: true
        },
        {
            type: 'PROCESSED',
            description: 'Processed',
            selected: true
        },
        {
            type: 'RELEASED',
            description: 'Released',
            selected: true
        },
        {
            type: 'ERROR',
            description: 'Error',
            selected: true
        }
    ];

    constructor(private holdService: CardHoldsService, private titleService: Title) {
        super();
        TitleService.setTitle(WINDOW_TITLE.cardHolds);
        this.titleService.setTitle(PAGE_TITLES.cardHolds);
    }

    ngOnInit() {
        this.getHolds();
    }

    /**
     * Makes a request to get list of card holds
     */
    getHolds() {
        this.holdService.viewCardHoldItems({
            pageNumber: this.page,
            pageSize: this.size,
            filter: this.filter,
            sort: this.sort
        }).then(data => {
            this.holds = data.records as CardHoldItem[];
            this.totalPages = data.totalPages;
        }).catch();
    }

    /**
     * Changes sort type
     * @param type - 'date' or 'status'
     */
    onSort(type) {
        const prev = this.sort[type];
        this.sort = {};
        if (prev === null || prev === 'desc') {
            this.sort[type] = 'asc';
        } else {
            this.sort[type] = 'desc';
        }

        this.getHolds();
    }

    /**
     * Sets statuses filter and updates list of card holds
     * @param search
     */
    setStatusFilter(search) {
        if (search) {
            this.filter.statuses = this.statuses.filter(s => s.selected).map(s => s.type);
            this.getHolds();
        }
        this.showStatuses = false;
    }

    /**
     * Opens or closes statuses filter box
     * @param showStatuses
     */
    onFilterStatus(showStatuses) {
        setTimeout(() => this.showStatuses = !showStatuses, 2);
    }

    /**
     * Changes current page
     * @param page
     */
    onPagination(page) {
        this.page = page;
        this.getHolds();
    }

}
