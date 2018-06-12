import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
    selector: 'app-pagination-buttons',
    templateUrl: './pagination-buttons.component.html',
    styles: []
})
export class PaginationButtonsComponent implements OnInit, OnChanges {

    @Input() page: number;
    @Input() totalPage: number;

    @Output() changePage = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    onClick(number, canChange = true) {
        if (canChange) {
            // this.page += number;
            this.changePage.emit(this.page + number);
        }
    }

    ngOnChanges(changes: SimpleChanges) {

    }

}
