import {Component, OnInit} from '@angular/core';

import {InputComponent} from '../input';

@Component({
    selector: 'app-input-cvv',
    templateUrl: './input-cvv.component.html',
    styleUrls: ['./input-cvv.component.css']
})
export class InputCvvComponent extends InputComponent implements OnInit {
    // public realVal = '';
    public hidden = true;

    constructor() {
        super();
    }

    ngOnInit() {
    }

    public onValInput(): void {
        // if (!this.val) {
        //     return;
        // }
        // const lastLetter = this.val[this.val.length - 1];
        // if (!lastLetter.match(/\d/g)) {
        //     return;
        // }
        // this.realVal = this.val.length < this.realVal.length
        //     ? this.realVal.substring(0, this.realVal.length - 2)
        //     : `${this.realVal}${lastLetter}`;
        // this.valUpdated.emit(this.realVal);
    }

    public switchVisibility(): void {
        this.hidden = !this.hidden;
    }

}
