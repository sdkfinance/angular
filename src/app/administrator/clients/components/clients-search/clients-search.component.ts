import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-clients-search',
    templateUrl: './clients-search.component.html',
    styles: []
})
export class ClientsSearchComponent implements OnInit {
    searchUser: FormGroup;
    @Output() onSearch: EventEmitter<any> = new EventEmitter<any>();
    @Input() searchResValue;
    @Output() resetSearch: EventEmitter<any> = new EventEmitter<any>();

    constructor(fb: FormBuilder) {
        this.searchUser = fb.group({
            "filter": ['null'],
            "value": [null]/*,
          "legalType": ['individual']*/
        });

        this.searchUser.get('filter').valueChanges.subscribe(() => {
            this.searchUser.get('value').setValue(null);
        })
    }

    ngOnInit() {
    }

    searchClient(form: FormGroup) {
        let createData = {
            filter: {
                roles: [
                    "individual"
                ]
            }
        };
        let filterName = this.searchUser.get('filter').value;
        createData.filter[filterName] = this.searchUser.get('value').value;
        // console.log(createData);
        this.onSearch.emit(createData);
    }

    onReset() {
        this.searchUser.get('value').setValue(null);
        this.resetSearch.emit();
    }
}
