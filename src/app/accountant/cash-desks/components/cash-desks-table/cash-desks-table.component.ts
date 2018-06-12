import {Component, OnInit} from '@angular/core';
import {OrganizationsService} from '../../../../_services/organizations.service';
import {Organization} from '../../../../_interfaces/organization';
import {Pagination} from '../../../../_services/page-state/pagination';

@Component({
    selector: 'app-cash-desks-table',
    templateUrl: './cash-desks-table.component.html',
    styleUrls: ['./cash-desks-table.component.less']
})
export class CashDesksTableComponent extends Pagination implements OnInit {

    /** List of organizations <cash_desk> */
    organizations: Organization[];

    constructor(private orgService: OrganizationsService) {
        super();
    }

    ngOnInit() {
        this.getOrganization();
    }

    /**
     * Makes a request to get organizations <cash_desk>
     */
    getOrganization() {
        this.orgService.getOrganizations({
            filter: {
                types: ['cash_desk']
            },
            pageNumber: this.page,
            pageSize: this.size
        }).then(data => {
            this.organizations = data.records as Organization[];
            this.totalPages = data.totalPages;
        }).catch(e => e);
    }

    /**
     * Changes current page
     * @param page
     */
    changePage(page) {
        this.page = page;
        this.getOrganization();
    }

}
