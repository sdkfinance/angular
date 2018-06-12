import {Component, Input, OnInit} from '@angular/core';
import {Coin} from '../../../../../_classes/coin';
import {TransactionItem} from '../../../../../_classes/transaction-item';

@Component({
    selector: 'app-transaction-item',
    templateUrl: './transaction-item.component.html',
    styleUrls: ['./transaction-item.component.less']
})
export class TransactionItemComponent extends TransactionItem implements OnInit {
    /** List of the user's coin */
    @Input() userCoins: Coin[] = null;
    /** Transaction for displaying */
    @Input() selectedTransaction = null;

    constructor() {
        super();
    }

    ngOnInit() {
        this.setTransaction(this.selectedTransaction);
    }

}
