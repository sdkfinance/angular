import {Component, OnInit} from '@angular/core';
import {ContractManagementService} from '../../../services/contract-management.service';
import {ActivatedRoute} from '@angular/router';
import {ContractsService} from '../../../../../_services/contracts.service';
import {Contract} from '../../../../../_interfaces/contract';
import {TitleService} from '../../../../../_services/title.service';
import {ORGANIZATION_TYPES, PAGE_TITLES} from '../../../../../app.constants';
import {Title} from '@angular/platform-browser';
import {capitalizeFirstLetter} from '../../../../../app.functions';
import {I18nPipe} from '../../../../../_pipes/i18n.pipe';

@Component({
    selector: 'app-contract-details',
    templateUrl: './contract-details.component.html',
    styleUrls: ['./contract-details.component.less']
})
export class ContractDetailsComponent implements OnInit {

    contract: Contract;

    orgTypes = ORGANIZATION_TYPES;

    constructor(private title: Title, private contractManagementService: ContractManagementService, private route: ActivatedRoute,
                private contractsService: ContractsService, private i18nPipe: I18nPipe) {
        this.contractManagementService.contractId = this.route.snapshot.params.id;
    }

    ngOnInit() {
        this.title.setTitle(PAGE_TITLES.contracts);
        this.getContract(this.route.snapshot.params.id);
    }

    /**
     * Makes a request to get current contract
     * @param {string} id - Contract id
     */
    getContract(id: string) {
        this.contractsService.getContracts({
            filter: {
                id: id,
            },
            pageNumber: 0,
            pageSize: 1
        }).then(data => {
            this.contract = data.records[0];
            TitleService.setTitle(this.i18nPipe
                .transform('page.fin_spec.contract.view.name_col', {
                    '0': capitalizeFirstLetter(this.contract.personType),
                    '1': this.i18nPipe.transform(this.orgTypes[this.contract.organizationType])
                }));
        }).catch();
    }
}
