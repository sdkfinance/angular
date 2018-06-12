
import {Component, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-loyalty-management-creating-select-value-type',
    templateUrl: './loyalty-management-creating-select-value-type.component.html',
    styles: [`* {
        font-size: 14px
    }`],
    host: {
        '(document:click)': 'onClick($event)',
    }
})
export class LoyaltyManagementCreatingSelectValueTypeComponent implements OnInit {
    @Output() selectedItemUpdate = new EventEmitter();

    valueTypes = [
        {
            name: 'Specifies for each product or category',
            value: 'NOT_SPECIFIED'
        },
        {
            name: 'Percent from check',
            value: 'PERCENT'
        },
        {
            name: 'Fixed bonus in check',
            value: 'FIXED'
        }
    ];
    showItems: boolean = false;
    selectedItem = this.valueTypes[0];

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

    clearSelectedValueType() {
        this.selectedItem = this.valueTypes[0];
        this.selectedItemUpdate.emit(this.selectedItem);
    }

}
