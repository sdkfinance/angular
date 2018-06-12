import {Component, OnInit} from '@angular/core';
import {ContractsService} from '../../../../../_services/contracts.service';
import {CommissionProfile} from '../../../../../_interfaces/commission-profile';
import {ActivatedRoute} from '@angular/router';
import {TRANSACTION_TYPES} from '../../../../../app.constants';
import {ContractManagementService} from '../../../services/contract-management.service';

@Component({
    selector: 'app-transactions-table',
    templateUrl: './transactions-table.component.html',
    styleUrls: ['./transactions-table.component.less']
})
export class TransactionsTableComponent implements OnInit {
    /** Contract id */
    id: string;
    /** List of the commission profiles of this contract */
    commissionProfiles: CommissionProfile[];
    /** Lists of the commission profiles of this contract divided into groups */
    commissionProfilesGroups: {
        [transaction: string]: CommissionProfile[]
    } = {};

    transactionTypes = TRANSACTION_TYPES;

    constructor(private contractsService: ContractsService, private route: ActivatedRoute,
                private contractManagementService: ContractManagementService) {
    }

    ngOnInit() {
        this.id = this.contractManagementService.contractId;
        this.getCommissionProfiles(this.id);
    }

    /**
     * Makes a request to get list of the commission profiles
     * @param {string} id - Contract id
     */
    getCommissionProfiles(id: string) {
        this.contractsService.getCommissionProfilesForContract(id).then(data => {
            this.groupByType(data.records);
            this.commissionProfiles = data.records;
        }).catch();
    }

    /**
     * Divides commission profiles into groups
     * @param {CommissionProfile[]} commissionProfiles
     * @returns {{[p: string]: CommissionProfile[]}}
     */
    groupByType(commissionProfiles: CommissionProfile[]) {
        commissionProfiles.forEach(commission => {
            if (!this.commissionProfilesGroups[commission.flow.processType]) {
                this.commissionProfilesGroups[commission.flow.processType] = [];
            }
            this.commissionProfilesGroups[commission.flow.processType].push(commission);
        });
        return this.commissionProfilesGroups;
    }

    /**
     * Returns list of keys of commission profiles groups
     * @returns {string[]}
     */
    getGroupsKeys(): string[] {
        return Object.keys(this.commissionProfilesGroups);
    }
}
