import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {LoyaltyGroupsService} from '../../../../_services/loyalty-groups.service';
import {SnackBarComponent} from '../../../../_modules/ui/components/snack-bar/snack-bar.component';
import {SnackBarService} from '../../../../_services/snack-bar.service';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'app-loyalty-groups-creating',
    templateUrl: './loyalty-groups-creating.component.html',
    styles: []
})
export class LoyaltyGroupsCreatingComponent implements OnInit {

    exampleString: string = `{
    "name": "forIndiv",
    "conditions": {
        "type": "equals",
        "left": {
            "type": "field",
            "field": "email"
        },
        "right": "individual@sdk.finance"
    }
}`;
    requestString: string = '';
    loyaltyGroup: FormGroup;

    waiting: boolean = false;

    constructor(private loyaltyGroupsService: LoyaltyGroupsService,
                private fb: FormBuilder,
                public snackBarComponent: MatSnackBar,
                private snackBarService: SnackBarService) {
        this.loyaltyGroup = fb.group({
            loyalty: null
        });
    }

    ngOnInit() {
    }

    onAddGroup(requestString) {
        this.waiting = true;
        this.loyaltyGroupsService.createLoyaltyGroupsRequest(this.requestString)
            .then(data => {
                this.waiting = false;
                if (data) {
                    this.openSnackBarComponent();
                    this.loyaltyGroup.reset();
                }
            })
            .catch(error => this.waiting = false);
    }

    showExample() {
        this.requestString = this.exampleString;
    }

    openSnackBarComponent() {
        this.snackBarService.setMessage('Group created!');
        this.snackBarService.setAction('create');
        this.snackBarComponent.openFromComponent(SnackBarComponent, {
            duration: 1100
        });
    }
}
