import {Component, Input, OnInit} from '@angular/core';
import {Pagination} from '../../../../_services/page-state/pagination';
import {PrepaidService} from '../../../../_services/prepaid.service';

@Component({
    selector: 'app-vouchers-table',
    templateUrl: './vouchers-table.component.html',
    styleUrls: ['./vouchers-table.component.less']
})
export class VouchersTableComponent extends Pagination implements OnInit {

    /** List of the user's vouchers */
    vouchers: any[];

    constructor(private prepaidService: PrepaidService) {
        super();
    }

    ngOnInit() {
        this.prepaidService.getVouchersList().subscribe(data => {
            this.totalPages = data.totalPages;
            this.vouchers = data.records;
        });
        this.getVouchers();
    }

    /**
     * Makes a request to get a list of vouchers
     */
    getVouchers() {
        this.prepaidService.updateVouchersList({
            pageNumber: this.page,
            pageSize: this.size
        });
    }

    /**
     * Changes current page
     * @param page
     */
    changePage(page) {
        this.page = page;
        this.getVouchers();
    }

}
