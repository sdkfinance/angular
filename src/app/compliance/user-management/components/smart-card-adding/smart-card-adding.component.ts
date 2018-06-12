import {Component, OnInit} from '@angular/core';
import {ROLES_WITH_SMART_CARDS} from '../../../../app.constants';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientsService} from '../../../../_services/clients.service';
import {UserManagementService} from '../../services/user-management.service';

@Component({
    selector: 'app-smart-card-adding',
    templateUrl: './smart-card-adding.component.html',
    styles: []
})
export class SmartCardAddingComponent implements OnInit {

    /** The user account */
    userAccount;

    constructor(private userManagementService: UserManagementService,
                private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.getUserAccount();
    }

    /**
     * Gets user account to check role
     */
    getUserAccount() {
        this.userManagementService.getUserAccountSubject().subscribe(data => {
            if (data && !~ROLES_WITH_SMART_CARDS.indexOf(data.members[0].role)) {
                this.router.navigate(['../../../'], {relativeTo: this.route});
            } else {
                this.userAccount = data;
            }
        });
    }

}
