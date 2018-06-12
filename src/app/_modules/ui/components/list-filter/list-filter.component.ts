import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-list-filter',
    templateUrl: './list-filter.component.html',
    styleUrls: ['./list-filter.component.less'],
    host: {
        '(document:click)': 'onClick($event)',
    }
})
export class ListFilterComponent implements OnInit {

    @Input() items;
    @Output() close = new EventEmitter();

    constructor(private _eref: ElementRef) {
    }

    ngOnInit() {
    }

    onSelect() {
        this.items.forEach(element => element.selected = true);
    }

    onCancel() {
        this.items.forEach(element => element.selected = false);
    }

    onOk() {
        this.close.emit(true);
    }

    onClick(event) {
        if (!this._eref.nativeElement.contains(event.target)) {
            this.close.emit(false);
        }
    }

}
