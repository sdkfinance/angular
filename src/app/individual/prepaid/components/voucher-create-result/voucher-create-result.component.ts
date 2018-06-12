import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-voucher-create-result',
    templateUrl: './voucher-create-result.component.html',
    styleUrls: ['./voucher-create-result.component.less']
})
export class VoucherCreateResultComponent implements OnInit {

    @Input() result;
    @Output() close = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    onClose() {
        this.close.emit();
    }
}
