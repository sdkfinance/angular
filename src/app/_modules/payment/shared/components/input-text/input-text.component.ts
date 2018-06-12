import {Component, OnInit} from '@angular/core';

import {InputComponent} from '../input';

@Component({
    selector: 'app-input-text',
    templateUrl: './input-text.component.html',
    styleUrls: ['./input-text.component.css']
})
export class InputTextComponent extends InputComponent implements OnInit {

    constructor() {
        super();
    }

    ngOnInit() {
    }

}
