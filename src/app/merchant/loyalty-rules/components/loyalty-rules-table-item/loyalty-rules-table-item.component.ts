import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LoyaltyRule} from '../../../../_classes/loyalty-rule';
import {LoyaltyRulesService} from '../../../../_services/loyalty-rules.service';
import {SnackBarService} from '../../../../_services/snack-bar.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {SnackBarComponent} from '../../../../_modules/ui/components/snack-bar/snack-bar.component';
import {ConfirmDeleteComponent} from '../../../../_modules/ui/components/confirm-delete/confirm-delete.component';

@Component({
    selector: 'app-loyalty-rules-table-item',
    templateUrl: './loyalty-rules-table-item.component.html',
    styleUrls: ['../loyalty-rules-table/loyalty-rules-table.component.less']
})
export class LoyaltyRulesTableItemComponent implements OnInit {
    @Input() loyaltyRule: LoyaltyRule;
    @Input() number;

    @Output() loyaltyRuleUpdate = new EventEmitter();

    showDetails: boolean = false;

    constructor(private loyaltyRulesService: LoyaltyRulesService,
                private dialog: MatDialog,
                public snackBar: MatSnackBar,
                public snackBarComponent: MatSnackBar,
                private snackBarService: SnackBarService
    ) {
    }

    ngOnInit() {
    }

    onToggle() {
        this.showDetails = !this.showDetails;
    }

    onDelete(ruleId) {
        if (event && ruleId) {
            this.loyaltyRulesService.deleteLoyaltyRule(ruleId)
                .then(response => {
                    this.loyaltyRuleUpdate.emit();
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
                nameToDelete:  this.loyaltyRule.name,
                outputData: this.loyaltyRule.id
            }
        }).afterClosed().subscribe(this.afterCloseModal.bind(this));
    }

    afterCloseModal(result) {
        // обработка результата
        this.onDelete(result);

    }

    openSnackBarComponent() {
        this.snackBarService.setMessage('Promotion deleted!');
        this.snackBarService.setAction('delete');
        this.snackBarComponent.openFromComponent( SnackBarComponent, {
            duration: 1100,
        });
    }

}
