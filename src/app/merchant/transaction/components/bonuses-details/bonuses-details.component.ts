import {Component, OnInit} from '@angular/core';
import {TransactionService} from "../../../../_services/transaction.service";
import {Http} from "@angular/http";
import {ActivatedRoute} from "@angular/router";
import {TitleService} from "../../../../_services/title.service";
import {PAGE_TITLES, WINDOW_TITLE} from "../../../../app.constants";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-bonuses-details',
    templateUrl: './bonuses-details.component.html',
    styleUrls: ['./bonuses-details.component.less']
})
export class BonusesDetailsComponent implements OnInit {
    bonuses: any = null;

    constructor(private route: ActivatedRoute, private http: Http, private transactionService: TransactionService, private titleService: Title) {
        this.titleService.setTitle(PAGE_TITLES.transactions);

    }

    ngOnInit() {
        this.transactionService.getBonuses(this.route.snapshot.params.id).then(this.setBonuses.bind(this));
        TitleService.setTitle(WINDOW_TITLE.bonusDetails);
    }

    setBonuses(data) {
        this.bonuses = data.records;
    }

}
