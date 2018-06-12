import {Component, OnInit} from '@angular/core';
import {UserManagementService} from '../../services/user-management.service';
import {ROLES_WITH_WALLETS} from '../../../../app.constants';
import {ActivatedRoute, Router} from '@angular/router';
import {Coin} from '../../../../_classes/coin';
import {CoinsService} from '../../../../_services/coins.service';
import {OrganizationsService} from '../../../../_services/organizations.service';

@Component({
    selector: 'app-user-details-wallets',
    templateUrl: './user-details-wallets.component.html',
    styleUrls: ['./user-details-wallets.component.less']
})
export class UserDetailsWalletsComponent implements OnInit {

    /** The user account */
    userAccount;

    /** The user's wallets */
    wallets: Coin[];

    constructor(private userManagementService: UserManagementService,
                private organizationsService: OrganizationsService,
                private coinsService: CoinsService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.getUserAccount();
    }

    /**
     * Gets user account to check role
     */
    getUserAccount() {
        this.userManagementService.getUserAccountSubject().subscribe(data => {
            this.userAccount = data;
            if (data && !~ROLES_WITH_WALLETS.indexOf(data.members[0].role)) {
                this.router.navigate(['../../'], {relativeTo: this.route});
            } else if (data) {
                this.getWallets();
            }
        });
    }

    getWallets() {
        this.organizationsService.getCoinsForOrganization(this.userAccount.members[0].organization.id)
            .then(data => this.wallets = data.coins)
            .catch(() => this.wallets = []);
    }

}
