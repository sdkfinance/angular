import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ROLES, USER_IDENTIFICATION_STATUSES} from '../../../../app.constants';
import {ClientsService} from '../../../../_services/clients.service';
import {AuthorizationService} from '../../../../_services/authorization.service';

@Component({
    selector: 'app-users-table-item',
    templateUrl: './users-table-item.component.html',
    styleUrls: ['./users-table-item.component.less']
})
export class UsersTableItemComponent implements OnInit {

    /** User info */
    @Input() user;
    @Output() updateList = new EventEmitter();

    /** System roles */
    roles = ROLES[this.auth.userProfile.roles[0]];
    /** Statuses of user identification */
    identificationStatuses = USER_IDENTIFICATION_STATUSES;

    constructor(private clientService: ClientsService,
                private auth: AuthorizationService) {
    }

    ngOnInit() {
    }

    /**
     * Makes a request to activate the user
     */
    onActivate() {
        this.clientService.updateClient(this.user.id, {'active': true})
            .then(res => this.user.active = true)
            .catch();
    }

    /**
     * Makes a request to deactivate the user
     */
    onDeactivate() {
        this.clientService.updateClient(this.user.id, {'active': false})
            .then(res => this.user.active = false)
            .catch();
    }

}
