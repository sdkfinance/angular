import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-creating-result',
    templateUrl: './creating-result.component.html',
    styleUrls: ['./creating-result.component.less']
})
export class CreatingResultComponent implements OnInit {

    /** Created invoice */
    @Input() invoice;

    constructor() {
    }

    ngOnInit() {
    }

}
