import {Component, OnInit} from '@angular/core';
import {Pos} from '../../../../_classes/pos';
import {PosService} from '../../../../_services/pos.service';
import {PAGE_TITLES, WINDOW_TITLE} from '../../../../app.constants';
import {Title} from '@angular/platform-browser';
import {TitleService} from '../../../../_services/title.service';

@Component({
    selector: 'app-pos',
    templateUrl: './pos.component.html',
    styles: []
})
export class PosComponent implements OnInit {
    posList: Pos[] = null;

    editedPos: Pos;

    constructor(private posService: PosService, private  titleService: Title) {
        this.titleService.setTitle(PAGE_TITLES.pos);
        TitleService.setTitle(WINDOW_TITLE.pos);

    }

    ngOnInit() {
        this.posService.getPosList().then((data: Pos[]) => {
                this.onSuccessPosList(data);
                this.posService.posListUpdates.subscribe(this.onSuccessPosList.bind(this));
            }
        );

        this.posService.getAction().subscribe(pos => {
            this.editedPos = pos;
        });
    }

    onSuccessPosList(array: Pos[]) {
        this.posList = [];
        for (let i in array) {
            this.posList.push(array[i]);
        }
    }

}

