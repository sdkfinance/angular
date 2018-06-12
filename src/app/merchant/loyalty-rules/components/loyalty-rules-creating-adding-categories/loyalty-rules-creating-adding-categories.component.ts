import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductCategory} from '../../../../_classes/product-category';
import {CategoriesService} from '../../../../_services/categories.service';

@Component({
    selector: 'app-loyalty-rules-creating-adding-categories',
    templateUrl: './loyalty-rules-creating-adding-categories.component.html',
    styles: []
})
export class LoyaltyRulesCreatingAddingCategoriesComponent implements OnInit {

    @Output() selectedCategoriesUpdate = new EventEmitter();

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

    categories: ProductCategory[] = null; // list of product categories received from api
    selectedCategories; // list of selected product categories
    categoriesTitle: string = 'Category';


    constructor(private categoriesService: CategoriesService) {
    }

    ngOnInit() {
        this.getCategories();
        this.createNewEmptySelectedCategoriesList();
    }

    getCategories() {
        this.categoriesService.getCategories()
            .then(res => this.categories = res.records)
            .catch(error => console.log(error));
    }

    onAddCategory() {
        this.selectedCategories.push(this.createNewSelectedCategory());
    }

    updateSelectedCategory(category: ProductCategory, idx: number) {
        this.selectedCategories[idx].category = category;
    }

    updateSelectedCategoryValueType(valueType: any, idx: number) {
        this.selectedCategories[idx].valueType = valueType;
        this.selectedCategories[idx].value = ''; // remove value after changing value type
    }

    createNewSelectedCategory() {
        return {
            category: null,
            valueType: this.valueTypes[0],
            value: ''
        }
    }

    createNewEmptySelectedCategoriesList() {
        this.selectedCategories = [this.createNewSelectedCategory()];
        this.selectedCategoriesUpdate.emit(this.selectedCategories);
    }

    onDelete(idx: number) {
        if (this.selectedCategories.length > 1) {
            this.selectedCategories.splice(idx, 1);
        } else {
            this.selectedCategories[0] = this.createNewSelectedCategory();
        }
    }

    canDelete() {
        return (this.selectedCategories.length > 1) || (this.selectedCategories[0].category);
    }

    clearSelectedCategories() {
        this.createNewSelectedCategory();
    }
}
