import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-transfer-result',
    templateUrl: './transfer-result.component.html',
    styles: []
})
export class TransferResultComponent implements OnInit {

    /** Transfer result data */
    @Input() result;
    /** Currency of made transfer */
    @Input() currency;
    @Output() resetResult = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    /**
     * Closes window with result
     */
    onClose() {
        this.resetResult.emit();
    }

}
