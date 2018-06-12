import {Component, OnInit} from '@angular/core';
import {ROLES_WITH_SMART_CARDS} from '../../../../app.constants';
import {UserManagementService} from '../../services/user-management.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Pagination} from '../../../../_services/page-state/pagination';
import {SmartCardsService} from '../../../../_services/smart-cards.service';
import {SnackBarComponent} from '../../../../_modules/ui/components/snack-bar/snack-bar.component';
import {ConfirmDeleteComponent} from '../../../../_modules/ui/components/confirm-delete/confirm-delete.component';
import {SnackBarService} from '../../../../_services/snack-bar.service';
import {MatDialog, MatSnackBar} from '@angular/material';

@Component({
    selector: 'app-smart-cards',
    templateUrl: './smart-cards.component.html',
    styleUrls: ['./smart-cards.component.less']
})
export class SmartCardsComponent extends Pagination implements OnInit {

    /** The user's smart cards */
    smartCards;

    /** The user account */
    userAccount;

    constructor(private userManagementService: UserManagementService, private smartCardsService: SmartCardsService,
                private route: ActivatedRoute, private router: Router,
                public snackBarComponent: MatSnackBar,
                private snackBarService: SnackBarService,
                private dialog: MatDialog) {
        super();
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
            if (data && !~ROLES_WITH_SMART_CARDS.indexOf(data.members[0].role)) {
                this.router.navigate(['../../'], {relativeTo: this.route});
            } else if (data) {
                this.getSmartCards();
            }
        });
    }

    /**
     * Makes a request to get the user smart cards
     */
    getSmartCards() {
        this.smartCardsService.viewSmartCards({
            filter: {
                organizationIds: [
                    this.userAccount.members[0].organization.id
                ]
            },
            pageNumber: this.page,
            pageSize: this.size
        }).then(data => {
            this.smartCards = data.records;
            this.totalPages = data.totalPages;
        }).catch();
    }

    /**
     * Changes current page
     * @param page - New page number
     */
    changePage(page) {
        this.page = page;
        this.getSmartCards();
    }

    /**
     * Makes a request to delete the smart card
     * @param card - Smart card to delete
     */
    onDelete(card) {
        this.dialog.open(ConfirmDeleteComponent, {
            width: '370px',
            data: {
                title: '',
                nameToDelete: card.name,
                outputData: card.cardNumber
            }
        }).afterClosed().subscribe(cardNumber => {
            if (cardNumber) {
                this.smartCardsService.deleteSmartCard(cardNumber).then(data => this.getSmartCards()).catch();
            }
        });
    }

    /**
     * Makes a request to activate or deactivate the smart card
     * @param card - Smart card to activate/deactivate
     */
    onActivate(card) {
        this.smartCardsService.updateSmartCard(card.cardNumber, {
            active: !card.active,
            name: card.name
        }).then(data => {
            this.getSmartCards();
            this.openSnackBarComponent('delete', 'The smart card deleted!');
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
