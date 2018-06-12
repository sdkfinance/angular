import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {PAGE_TITLES, WINDOW_TITLE} from '../../../../app.constants';
import {TitleService} from '../../../../_services/title.service';

@Component({
    selector: 'app-loyalty-products',
    templateUrl: './loyalty-products.component.html',
    styles: []
})
export class LoyaltyProductsComponent implements OnInit {

    constructor(private titleService: Title) {
        this.titleService.setTitle(PAGE_TITLES.products);
        TitleService.setTitle(WINDOW_TITLE.products);
    }

    ngOnInit() {
    }

}
