import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-transactions-search',
    templateUrl: './transactions-search.component.html',
    styles: []
})
export class TransactionsSearchComponent implements OnInit {

    @Output() onSearch: EventEmitter<any> = new EventEmitter<any>();

    searchTransaction: FormGroup;
    lastFilter = null;

    constructor(fb: FormBuilder) {
        this.searchTransaction = fb.group({
            "filter": ['null'],
            "value": [null],
            "status": ['paid']
        });

        // this.searchTransaction.get('filter').valueChanges.subscribe(data => {
        //     if (data == 'null') {
        //         this.onSearch.emit(null);
        //     }
        // });

        this.searchTransaction.get('filter').valueChanges.subscribe(data => {
            this.searchTransaction.get('value').setValue(null);
        });
    }

    ngOnInit() {
    }

    onSearchTransaction(form: FormGroup) {
        let createData = {
            filter: {}
        };

        let filterName = this.searchTransaction.get('filter').value;
        if (filterName != 'statuses') {
            createData.filter[filterName] = this.searchTransaction.get('value').value;
        } else {
            createData.filter[filterName] = [this.searchTransaction.get('status').value];
        }
        this.lastFilter = createData.filter;
        this.onSearch.emit(createData.filter);
    }

    onReset() {
        this.lastFilter = null;
        this.searchTransaction.get('value').reset();
        this.onSearch.emit(null);
    }

}
