import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-loyalty-rules-creating-select',
    templateUrl: './loyalty-rules-creating-select.component.html',
    styles: [`* {
        font-size: 14px
    }`],
    host: {
        '(document:click)': 'onClick($event)',
    }
})
export class LoyaltyRulesCreatingSelectComponent implements OnInit {

    @Input() menuTitle: string = "Choose";
    @Input() disable: boolean = false;
    @Input() items;
    @Input() selectedItem = null;
    @Input() doNotChangeMenuTitle: boolean = false;

    @Output() selectedItemUpdate = new EventEmitter();

    showItems: boolean = false;

    constructor(private eRef: ElementRef) {
    }

    ngOnInit() {
    }

    onMenuTitleClick() {
        if (!this.disable) this.showItems = !this.showItems;
    }

    onItemClick(item) {
        this.showItems = false;
        this.selectedItem = item;
        if (!this.doNotChangeMenuTitle) this.menuTitle = this.selectedItem.name;
        this.selectedItemUpdate.emit(this.selectedItem);
    }

    onClick(event) {
        if (!this.eRef.nativeElement.contains(event.target)) {
            this.showItems = false;
        }
    }
}
