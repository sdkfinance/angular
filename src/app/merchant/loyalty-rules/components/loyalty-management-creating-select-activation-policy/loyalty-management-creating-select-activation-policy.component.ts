import {Component, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-loyalty-management-creating-select-activation-policy',
    templateUrl: './loyalty-management-creating-select-activation-policy.component.html',
    styles: [`* {
        font-size: 14px
    }`],
    host: {
        '(document:click)': 'onClick($event)',
    }
})
export class LoyaltyManagementCreatingSelectActivationPolicyComponent implements OnInit {
    @Output() selectedItemUpdate = new EventEmitter();

    activationPolicies = [
        {
            name: 'All POS',
            value: 'ALL_POINTS_OF_SALE'
        },
        {
            name: 'Selected POS',
            value: 'SELECTED_POINTS_OF_SALE'
        }
    ];
    showItems: boolean = false;
    selectedItem = this.activationPolicies[0];

    constructor(private eRef: ElementRef) {
    }

    ngOnInit() {
        this.selectedItemUpdate.emit(this.selectedItem);
    }

    onMenuTitleClick() {
        this.showItems = !this.showItems;
    }

    onItemClick(item) {
        this.showItems = false;
        this.selectedItem = item;
        this.selectedItemUpdate.emit(this.selectedItem);
    }

    onClick(event) {
        if (!this.eRef.nativeElement.contains(event.target)) {
            this.showItems = false;
        }
    }

    clearSelectedActivationPolicy() {
        this.selectedItem = this.activationPolicies[0];
        this.selectedItemUpdate.emit(this.selectedItem);
    }

}
