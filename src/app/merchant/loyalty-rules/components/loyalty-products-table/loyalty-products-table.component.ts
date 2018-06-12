import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../../../_services/products.service';
import {Product} from '../../../../_classes/product';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-loyalty-products-table',
    templateUrl: './loyalty-products-table.component.html',
    styleUrls: ['./loyalty-products-table.component.less']
})
export class LoyaltyProductsTableComponent implements OnInit {

    products: Product[] = null;
    totalPages: number = 0;
    currentPage: number = 0;
    pageSize: number = 8;
    totalRecords: number = 0;
    pageNumber: number = 0;
    subscription: Subscription;


    constructor(private productsService: ProductsService) {
    }

    ngOnInit() {
        this.getProductsList();
    }

    getProductsList() {
        this.subscription = this.productsService.getProducts().subscribe(products => {
            this.totalRecords = (<any>products).totalRecords;
            this.totalPages = (<any>products).totalPages;
            this.products = (<any>products).records;
            this.currentPage = (<any>products).pageNumber;
        });

        this.productsService.updateProducts(this.createBody());
    }

    createBody() {
        return {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            sort: {
                externalCode: 'asc'
            }
        }
    }

    onNextPage() {
        this.pageNumber = this.currentPage + 1;
        this.productsService.updateProducts(this.createBody());
    }

    onPreviousPage() {
        this.pageNumber = this.currentPage - 1;
        this.productsService.updateProducts(this.createBody());
    }

}
