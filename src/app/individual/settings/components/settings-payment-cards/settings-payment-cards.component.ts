import {Component, OnInit} from '@angular/core';
import {CardService} from '../../../../_services/card.service';
import {ConfirmDeleteComponent} from '../../../../_modules/ui/components/confirm-delete/confirm-delete.component';
import {SnackBarComponent} from '../../../../_modules/ui/components/snack-bar/snack-bar.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {SnackBarService} from '../../../../_services/snack-bar.service';

@Component({
    selector: 'app-settings-payment-cards',
    templateUrl: './settings-payment-cards.component.html',
    styleUrls: ['./settings-payment-cards.component.less']
})
export class SettingsPaymentCardsComponent implements OnInit {

    /** List of the user's payment cards */
    cards: any[] = null;

    constructor(private cardService: CardService,
                public snackBarComponent: MatSnackBar,
                private snackBarService: SnackBarService,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        this.getCards();
    }

    /**
     * Gets the user's payment cards from API
     */
    getCards() {
        this.cardService.getCards().then(data => this.cards = (<any>data).records).catch();
    }

    /**
     * Deletes selected card and gets new card list
     * @param id Id of card user is going to delete
     */
    onDelete(card) {
        this.dialog.open(ConfirmDeleteComponent, {
            width: '370px',
            data: {
                title: '',
                nameToDelete: '**** **** **** ' + card.last4Digits,
                outputData: card.id
            }
        }).afterClosed().subscribe(id => {
            if (event && id) {
                this.cardService.deleteCard(id).then(() => {
                    this.getCards();
                    this.openSnackBarComponent();
                }).catch();
            }
        });
    }

    /**
     * Opens snack bar with info about successful deleting
     */
    openSnackBarComponent() {
        this.snackBarService.setMessage('Card deleted!');
        this.snackBarService.setAction('delete');
        this.snackBarComponent.openFromComponent(SnackBarComponent, {
            duration: 1100,
        });
    }

}
