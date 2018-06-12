import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ClientsService} from '../../../../_services/clients.service';
import {ROLES, USER_IDENTIFICATION_STATUSES} from '../../../../app.constants';
import {ProfileIdentificationService} from '../../../../_services/profile-identification.service';
import {AuthorizationService} from '../../../../_services/authorization.service';

@Component({
    selector: 'app-users-table-item',
    templateUrl: './users-table-item.component.html',
    styleUrls: ['./users-table-item.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class UsersTableItemComponent implements OnInit {

    /** User info */
    @Input() user;

    /** User profile */
    profile;
    /** System roles */
    roles = ROLES[this.auth.userProfile.roles[0]];
    /** Statuses of user identification */
    identificationStatuses = USER_IDENTIFICATION_STATUSES;

    approvingError: boolean = false;

    constructor(private clientService: ClientsService, private identificationService: ProfileIdentificationService,
                private auth: AuthorizationService) {
    }

    ngOnInit() {
        this.getUserProfile();
    }

    /**
     * Makes a request to get user profile
     */
    getUserProfile() {
        this.clientService.getUserProfileById(this.user.id).then(data => {
            this.profile = data.profile;
        }).catch();
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

    onApprove() {
        this.identificationService.approveIdentification(this.user.id).then(data => {
            this.profile = data.profile;
        }).catch(error => {
            error = error.error;
            if (error.code = 'PROFILE_DOCUMENTS_REQUIRED') {
                this.approvingError = true;
            }
        });
    }

    onDecline() {
        this.identificationService.declineIdentification(this.user.id).then(data => {
            this.profile = data.profile;
        }).catch();
    }

}
