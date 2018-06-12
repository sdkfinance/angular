import {Component, OnDestroy, OnInit} from '@angular/core';

import {InputComponent} from '../input';
import {CreditCardMaskPipe} from '../../../pipes';

@Component({
    selector: 'app-input-number',
    templateUrl: './input-number.component.html',
    styleUrls: ['./input-number.component.css'],
    providers: [CreditCardMaskPipe]

})
export class InputNumberComponent extends InputComponent implements OnInit, OnDestroy {

    constructor(private pipe: CreditCardMaskPipe) {
        super();
    }

    ngOnInit() {
        this.subscription = this.parent.get(this.name).valueChanges.subscribe(data => {
            this.val = this.pipe.transform(data);
            if (data !== this.val) {
                this.parent.get(this.name).setValue(this.val);
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
