import {Component, OnInit, Input, Output, EventEmitter, OnDestroy} from '@angular/core';

import {InputComponent} from '../input';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-input-date',
    templateUrl: './input-date.component.html',
    styleUrls: ['./input-date.component.css']
})
export class InputDateComponent extends InputComponent implements OnInit, OnDestroy {
    @Input() secondVal: string | number;
    @Input() secondName: string;
    @Input() secondPlaceholder: string;
    @Input() secondPattern: string;


    constructor() {
        super();
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

}
