import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PosService} from '../../../../_services/pos.service';
import {PAGE_TITLES, WINDOW_TITLE} from '../../../../app.constants';
import {TitleService} from '../../../../_services/title.service';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-pos-info',
    templateUrl: './pos-info.component.html',
    styles: []
})
export class PosInfoComponent implements OnInit {

    constructor(private route: ActivatedRoute, private posService: PosService, private  titleService: Title) {
        this.titleService.setTitle(PAGE_TITLES.pos);
        // TitleService.setTitle(WINDOW_TITLE.pos);
    }

    ngOnInit() {
        this.posService.getInfoAboutPos(this.route.snapshot.params.id).then(pos => TitleService.setTitle(pos.pos.name));
    }
}
