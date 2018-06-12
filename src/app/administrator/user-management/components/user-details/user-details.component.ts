import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClientsService} from '../../../../_services/clients.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserManagementService} from '../../services/user-management.service';
import {ROLES_WITH_SMART_CARDS, ROLES_WITH_WALLETS} from '../../../../app.constants';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.less']
})
export class UserDetailsComponent implements OnInit, OnDestroy {

    /** The user's id */
    userId: string;
    /** True if the user can have wallets */
    hasWallets: boolean = false;
    /** True if the user can have smart cards */
    hasSmartCards: boolean = false;

    constructor(private clientsService: ClientsService, private route: ActivatedRoute, private router: Router,
                private userManagementService: UserManagementService) {
    }

    ngOnInit() {
        this.userId = this.route.snapshot.params.id;
        this.userManagementService.userId = this.userId;
        this.getUserProfile();
        this.getUserAccount();
    }

    /** Makes a request to get user profile by id */
    getUserProfile() {
        this.clientsService.getUserProfileById(this.userId).then(data => {
            this.userManagementService.setUserProfileSubject(data.profile);
        }).catch(() => this.router.navigate(['../'], {relativeTo: this.route}));
    }

    /** Makes a request to get user account */
    getUserAccount() {
        this.clientsService.getUsers({
            filter: {
                ids: [this.userId]
            },
            pageNumber: 0,
            pageSize: 1
        }).then(data => {
            if (data.records[0]) {
                this.userManagementService.setUserAccountSubject(data.records[0]);
                this.hasWallets = data && ROLES_WITH_WALLETS.indexOf(data.records[0].members[0].role) !== -1;
                this.hasSmartCards = data && ROLES_WITH_SMART_CARDS.indexOf(data.records[0].members[0].role) !== -1;
            } else {
                return;
            }
        }).catch();
    }

    ngOnDestroy() {
        this.userManagementService.setUserProfileSubject(null);
        this.userManagementService.setUserAccountSubject(null);
        this.userManagementService.userId = null;
    }
}
