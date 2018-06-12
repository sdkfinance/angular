import {Component, OnInit, Input} from '@angular/core';
import {Coin} from '../../../../_classes/coin';
import {PrepaidService} from '../../../../_services/prepaid.service';

@Component({
    selector: 'app-voucher-create',
    templateUrl: './voucher-create.component.html',
    styles: []
})
export class VoucherCreateComponent implements OnInit {

    /** List of the user's coins */
    @Input() coins: Coin[] = null;
    /** Info about created voucher */
    result = null;

    constructor(private prepaidService: PrepaidService) {
    }

    ngOnInit() {
    }

    /** Sets result of the creating and updates list of vouchers */
    getResult(result) {
        this.result = result;
        this.prepaidService.updateVouchersList();
    }

    /**
     * Deletes result after close button click
     */
    onClose() {
        this.result = null;
    }

}


