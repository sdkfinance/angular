import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ClientsService} from '../../../../_services/clients.service';
import {Pagination} from '../../../../_services/page-state/pagination';
import {ROLES} from '../../../../app.constants';
import {IdentificationUsersService} from '../../services/identification-users.service';
import {AuthorizationService} from '../../../../_services/authorization.service';

@Component({
    selector: 'app-users-table',
    templateUrl: './users-table.component.html',
    styleUrls: ['./users-table.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class UsersTableComponent extends Pagination implements OnInit, OnDestroy {

    /** List of the users */
    users;

    /** List of system roles */
    roles = ROLES[this.auth.userProfile.roles[0]];

    filter = {};

    selectedRole = '';

    textFilter: string;

    constructor(private clientsService: ClientsService, private usersService: IdentificationUsersService,
                private auth: AuthorizationService) {
        super();
    }

    ngOnInit() {
        if (this.usersService.filtersStorage) {
            this.filter = this.usersService.filtersStorage['filter'];
            this.selectedRole = this.filter['roles'] ? this.filter['roles'][0] || '' : '';
            this.textFilter = this.usersService.filtersStorage['textFilter'];
            this.size = this.usersService.filtersStorage['size'];
            this.records = this.usersService.filtersStorage['totalRecords'];
            this.page = this.usersService.filtersStorage['page'];
            this.totalPages = this.usersService.filtersStorage['totalPages'];
        }
        this.getUsers();
    }

    /**
     * Makes a request to get list of the users
     */
    getUsers() {
        this.clientsService.getUsers({
            sort: {
                date: 'desc'
            },
            filter: this.filter,
            pageNumber: this.page,
            pageSize: this.size
        }).then(data => {
            this.users = data.records;
            this.totalPages = data.totalPages;
            this.records = data.totalRecords;
        }).catch(() => this.users = []);
    }

    /**
     * Returns keys of system roles
     * @returns {string[]}
     */
    getRoleKeys() {
        return Object.keys(this.roles);
    }

    /**
     * Gets list of users with the specified role
     * @param role - Role
     */
    onChange(role) {
        this.page = 0;
        this.filter['roles'] = role ? [role] : null;
        this.getUsers();
    }

    onSearch() {
        this.filter['text'] = this.textFilter;
        this.page = 0;
        this.getUsers();
    }

    /**
     * Changes current page
     * @param page
     */
    changePage(page) {
        this.page = page;
        this.getUsers();
    }

    ngOnDestroy() {
        this.usersService.filtersStorage = {};
        this.usersService.filtersStorage['filter'] = this.filter;
        this.usersService.filtersStorage['textFilter'] = this.textFilter;
        this.usersService.filtersStorage['size'] = this.size;
        this.usersService.filtersStorage['records'] = this.records;
        this.usersService.filtersStorage['page'] = this.page;
        this.usersService.filtersStorage['totalPages'] = this.totalPages;
    }

}
