import {Component, OnInit} from '@angular/core';
import {OrganizationsService} from '../../../../_services/organizations.service';
import {Organization} from '../../../../_interfaces/organization';
import {Coin} from '../../../../_classes/coin';
import {SystemOperationsService} from '../../services/system-operations.service';
import {TitleService} from '../../../../_services/title.service';
import {PAGE_TITLES, WINDOW_TITLE} from '../../../../app.constants';
import {Title} from '@angular/platform-browser';
import {SystemOperationType} from '../../../../_enums/system-operation-type.enum';
import {Pagination} from '../../../../_services/page-state/pagination';

@Component({
    selector: 'app-system-operations',
    templateUrl: './system-operations.component.html',
    styleUrls: ['./system-operations.component.less']
})
export class SystemOperationsComponent extends Pagination implements OnInit {

    /** List of organizations <cash_desk> */
    organizations: Organization[];
    /** Coins of an organization */
    coins: Coin[];
    /** The selected organization's id */
    organizationId;

    systemOperationTypes = SystemOperationType;
    selectedOperation = SystemOperationType.Input;

    constructor(private orgService: OrganizationsService, private systemOperationsService: SystemOperationsService, private title: Title) {
        super();
        this.title.setTitle(PAGE_TITLES.systemOperations);
        TitleService.setTitle(WINDOW_TITLE.systemOperations);
    }

    ngOnInit() {
        this.getOrganization();
        this.systemOperationsService.getOrganizationId().subscribe(this.setOrganizationId.bind(this));
    }

    /**
     * Makes a request to get organizations <cash_desk> and <gate_provider>
     */
    getOrganization() {
        this.orgService.getOrganizations({
            filter: {
                types: ['cash_desk', 'gate_provider']
            },
            pageNumber: this.page,
            pageSize: this.size
        }).then(data => {
            this.organizations = this.organizations || [];
            data.records.forEach(org => this.organizations.push(org));
            this.page++;
            if (data.totalPages > this.page) {
                this.getOrganization();
            } else {
                this.organizationId = this.getAvailableOrganization()[0].id;
                this.getCoins();
            }
        }).catch();
    }

    /**
     * Makes a request to get coin of an organization
     */
    getCoins() {
        const org = this.getAvailableOrganization().find(o => o.id === this.organizationId);
        (org.type === 'cash_desk' ?
            this.orgService.getCoinsForOrganization(this.organizationId) :
            this.orgService.getProviderCoins(this.organizationId))
            .then(data => {
                this.coins = data.coins;
            })
            .catch();
    }

    /**
     * Sets organization id and updates list of coins
     * @param id
     */
    setOrganizationId(id) {
        if (!id) {
            return;
        }
        this.organizationId = id;
        this.coins = [];
        this.getCoins();
    }

    /**
     * Sets selected operation
     * @param operation
     */
    selectOperation(operation: SystemOperationType) {
        this.selectedOperation = operation;
        this.setOrganizationId(this.getAvailableOrganization()[0].id);
    }

    /**
     * Returns a list of organizations allowed for selected operation type
     * @returns {any}
     */
    getAvailableOrganization() {
        if (!this.organizations) {
            return null;
        }
        if (this.selectedOperation === this.systemOperationTypes.Investment) {
            return this.organizations;
        } else {
            return this.organizations.filter(o => o.type === 'cash_desk');
        }
    }

}
