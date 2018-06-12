import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductsService} from "../../../../_services/products.service";
import {Product} from "../../../../_classes/product";

@Component({
    selector: 'app-loyalty-rules-creating-adding-products',
    templateUrl: './loyalty-rules-creating-adding-products.component.html',
    styles: []
})
export class LoyaltyRulesCreatingAddingProductsComponent implements OnInit {

    @Output() selectedProductsUpdate = new EventEmitter();

    valueTypes = [
        {
            name: 'Percent',
            value: 'PERCENT'
        },
        {
            name: 'Fixed',
            value: 'FIXED'
        }
    ];

    products: Product[] = [];
    selectedProducts = [this.createNewSelectedProduct()];
    productsTitle: string = "Products";

    totalPages: number;
    currentPage: number;
    pageSize: number = 20;
    totalRecords: number;
    pageNumber: number = 0;

    constructor(private productsService: ProductsService) {
    }

    ngOnInit() {
        this.getProducts();
        this.createNewEmptySelectedProductsList();
    }

    getProducts() {
        this.productsService.getProductsList(this.createProductsBody())
            .then(products => {
                this.totalRecords = (<any>products).totalRecords;
                this.totalPages = (<any>products).totalPages;
                this.pageNumber = (<any>products).pageNumber;

                let tempProducts: Product[] = (<any>products).records;
                for (let product of tempProducts) this.products.push(product);
                if (this.pageNumber < this.totalPages - 1) {
                    this.pageNumber++;
                    this.getProducts();
                }

            })
            .catch(error => console.log(error));
    }

    createProductsBody() {
        return {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            sort: {
                externalCode: "asc"
            }
        }
    }

    onAddProduct() {
        this.selectedProducts.push(this.createNewSelectedProduct());
    }

    updateSelectedProducts(product: Product, idx: number) {
        this.selectedProducts[idx].product = product;
    }

    updateSelectedProductValueType(valueType: any, idx: number) {
        this.selectedProducts[idx].valueType = valueType;
        this.selectedProducts[idx].value = "";
    }

    createNewSelectedProduct() {
        return {
            product: null,
            valueType: this.valueTypes[0],
            value: ""
        }
    }

    createNewEmptySelectedProductsList() {
        this.selectedProducts = [this.createNewSelectedProduct()];
        this.selectedProductsUpdate.emit(this.selectedProducts);
    }

    onDelete(idx: number) {
        if (this.selectedProducts.length > 1) {
            this.selectedProducts.splice(idx, 1);
        } else {
            this.selectedProducts[0] = this.createNewSelectedProduct();
        }
    }

    canDelete() {
        return (this.selectedProducts.length > 1) || (this.selectedProducts[0].product);
    }

    clearSelectedProducts() {
        this.createNewEmptySelectedProductsList();
    }
}
