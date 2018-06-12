import {Component, OnInit} from '@angular/core';
import {UserManagementService} from '../../services/user-management.service';
import {ConfirmDeleteComponent} from '../../../../_modules/ui/components/confirm-delete/confirm-delete.component';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';
import {SnackBarService} from '../../../../_services/snack-bar.service';
import {SnackBarComponent} from '../../../../_modules/ui/components/snack-bar/snack-bar.component';
import {ClientsService} from '../../../../_services/clients.service';
import {ROLES_WITH_SMART_CARDS} from "../../../../app.constants";

@Component({
    selector: 'app-user-details-view',
    templateUrl: './user-details-view.component.html',
    styles: []
})
export class UserDetailsViewComponent implements OnInit {

    /** The user profile for view */
    userProfile;
    /** The user's id */
    userId: string;

    constructor(private userManagementService: UserManagementService,
                private route: ActivatedRoute, private router: Router,
                private clientsService: ClientsService,
                public snackBarComponent: MatSnackBar,
                private snackBarService: SnackBarService,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        this.getUserProfile();
    }

    /** Subscribes for getting the user profile */
    getUserProfile() {
        this.userManagementService.getUserProfileSubject().subscribe(data => {
            this.userProfile = data;
            this.userId = this.userManagementService.userId;
        });
    }

    /**
     * Makes a request to delete the user profile
     */
    onDeleteUser() {
        this.dialog.open(ConfirmDeleteComponent, {
            width: '370px',
            data: {
                title: '',
                nameToDelete: 'the user',
                outputData: this.userId
            }
        }).afterClosed().subscribe(id => {
            if (id) {
                this.clientsService.deleteUserById(id).then(() => {
                    this.openSnackBarComponent('delete', 'The user deleted!');
                    if (this.userManagementService.filtersStorage
                        && this.userManagementService.filtersStorage.page === this.userManagementService.filtersStorage.totalPages - 1
                        && this.userManagementService.filtersStorage.records % this.userManagementService.filtersStorage.size === 1
                        && this.userManagementService.filtersStorage.totalPages > 1) {
                        this.userManagementService.filtersStorage.totalPages--;
                    }
                    this.router.navigate(['../../'], {relativeTo: this.route});
                }).catch();
            }
        });
    }

    /**
     * Makes a request to change password
     */
    onChangePassword() {
        this.clientsService.resetUserPassword(this.userId).then(() => {
            this.openSnackBarComponent('create', 'New password has been sent');
        }).catch();
    }

    openSnackBarComponent(action: string, message: string) {
        this.snackBarService.setMessage(message);
        this.snackBarService.setAction(action);
        this.snackBarComponent.openFromComponent(SnackBarComponent, {
            duration: 1100,
        });
    }

}
