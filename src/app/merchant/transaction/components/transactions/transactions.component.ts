import {Component, OnInit} from '@angular/core';
import {Transaction} from "../../../../_classes/transaction";
import {PAGE_TITLES, WINDOW_TITLE} from "../../../../app.constants";
import {Title} from "@angular/platform-browser";
import {TitleService} from "../../../../_services/title.service";

@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
    styles: []
})
export class TransactionsComponent implements OnInit {

    constructor(private titleService: Title) {
        this.titleService.setTitle(PAGE_TITLES.transactions);
        TitleService.setTitle(WINDOW_TITLE.transactions);
    }

    ngOnInit() {
    }

}
