import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../../../_services/products.service';
import {Product} from '../../../../_classes/product';

@Component({
    selector: 'app-loyalty-products-search',
    templateUrl: './loyalty-products-search.component.html',
    styles: []
})
export class LoyaltyProductsSearchComponent implements OnInit {

    externalCode: string = '';

    products: Product[] = null;

    waiting: boolean = false;

    constructor(private productsService: ProductsService) {
    }

    ngOnInit() {
    }

    onSearch() {
        this.waiting = true;
        while (this.externalCode[0] == ' ') {
            this.externalCode = this.externalCode.slice(1);
        }

        let body = {
            pageNumber: 0,
            pageSize: 20,
            filter: {
                externalCodes: [this.externalCode]
            }
        };

        this.productsService.getProductsList(body)
            .then(response => {
                this.products = response.records;
                this.waiting = false;
            })
            .catch(error => this.waiting = false);
    }

}
