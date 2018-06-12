import {Component, OnInit} from '@angular/core';
import {Pagination} from '../../../../../_services/page-state/pagination';
import {ContractsService} from '../../../../../_services/contracts.service';
import {Contract} from '../../../../../_interfaces/contract';

@Component({
    selector: 'app-contracts-table',
    templateUrl: './contracts-table.component.html',
    styleUrls: ['./contracts-table.component.less']
})
export class ContractsTableComponent extends Pagination implements OnInit {
    /** List of the contracts */
    contracts: Contract[];

    shownContracts: string[] = ['individual', 'merchant', 'payroll', 'exchanger'];

    constructor(private contractsService: ContractsService) {
        super();
    }

    ngOnInit() {
        this.getContracts();
    }

    /**
     * Makes a request to get contracts list
     */
    getContracts() {
        this.contractsService.getContracts({
            pageNumber: this.page,
            pageSize: this.size
        }).then(data => {
            this.contracts = (<Contract[]>data.records).filter(c => this.shownContracts.indexOf(c.organizationType) > -1);
            this.totalPages = data.totalPages;
            // this.records = data.totalRecords;
        }).catch();
    }

    changePage(page) {
        this.page = page;
    }
}
