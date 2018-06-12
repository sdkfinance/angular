import {Component, OnInit} from '@angular/core';
import {CoinsService} from "../../../../_services/coins.service";
import {Coin} from "../../../../_classes/coin";
import {Title} from "@angular/platform-browser";
import {PAGE_TITLES, WINDOW_TITLE} from "../../../../app.constants";
import {TitleService} from "../../../../_services/title.service";

@Component({
    selector: 'app-coins',
    templateUrl: './coins.component.html',
    styles: []
})
export class CoinsComponent implements OnInit {
    coins: Coin[] = null;

    constructor(private coinsService: CoinsService, private title: Title) {
        this.title.setTitle(PAGE_TITLES.coins);
        TitleService.setTitle(WINDOW_TITLE.coins);
    }

    ngOnInit() {
        this.getCoinsFromHttp();
    }

    getCoinsFromHttp() {
        this.coinsService.getCoins()
            .then(response => {
                this.coins = response.coins;
            })
            .catch(error => console.log(error));
    }

}
