import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../../_classes/product';

@Component({
    selector: 'app-loyalty-products-table-item',
    templateUrl: './loyalty-products-table-item.component.html',
    styleUrls: ['../loyalty-products-table/loyalty-products-table.component.less']
})
export class LoyaltyProductsTableItemComponent implements OnInit {
    @Input() product: Product;
    @Input() number: number;

    constructor() {
    }

    ngOnInit() {
    }

}
