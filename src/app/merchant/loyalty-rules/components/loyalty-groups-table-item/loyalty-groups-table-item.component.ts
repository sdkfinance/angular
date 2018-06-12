import {Component, Input, OnInit} from '@angular/core';
import {LoyaltyGroup} from '../../../../_classes/loyalty-group';
import {LoyaltyGroupsService} from '../../../../_services/loyalty-groups.service';
import {SnackBarComponent} from '../../../../_modules/ui/components/snack-bar/snack-bar.component';
import {MatSnackBar, MatDialog} from '@angular/material';
import {SnackBarService} from '../../../../_services/snack-bar.service';
import {ConfirmDeleteComponent} from '../../../../_modules/ui/components/confirm-delete/confirm-delete.component';

@Component({
    selector: 'app-loyalty-groups-table-item',
    templateUrl: './loyalty-groups-table-item.component.html',
    styleUrls: ['../loyalty-groups-table/loyalty-groups-table.component.less']
})
export class LoyaltyGroupsTableItemComponent implements OnInit {
    @Input() number;
    @Input() loyaltyGroup: LoyaltyGroup;

    showConditions = false;

    constructor(private loyaltyGroupsService: LoyaltyGroupsService,
                public snackBarComponent: MatSnackBar,
                private snackBarService: SnackBarService,
                private dialog: MatDialog) {
    }

    ngOnInit() {
    }

    conditionsToString() {
        let str: string = JSON.stringify(this.loyaltyGroup.conditions);
        return str;
    }

    onToggle() {
        this.showConditions = !this.showConditions;
    }

    openSnackBarComponent() {
        this.snackBarService.setMessage('Group deleted!');
        this.snackBarService.setAction('delete');
        this.snackBarComponent.openFromComponent( SnackBarComponent, {
            duration: 1100,
        });
    }

    onDelete(groupId) {
        if (event && groupId) {
            this.loyaltyGroupsService.deleteLoyaltyGroup(groupId)
                .then(response => {
                    this.loyaltyGroupsService.updateLoyaltyGroups();
                    this.openSnackBarComponent();
                })
                .catch(error => console.log(error));
        }
    }


    openDialog(title: string = 'New story'): void {
        this.dialog.open(ConfirmDeleteComponent, {
            width: '370px',
            data: {
                title: title,
                nameToDelete:  this.loyaltyGroup.name,
                outputData: this.loyaltyGroup.id
            }
        }).afterClosed().subscribe(this.afterCloseModal.bind(this));
    }

    afterCloseModal(result) {
        // обработка результата
        this.onDelete(result);

    }



}
