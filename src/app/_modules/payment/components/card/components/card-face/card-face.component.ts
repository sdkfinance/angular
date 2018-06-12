import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {Card} from '../../../../shared/card.model';
import {CardKeeperService} from '../../../../providers';
import {PATTERN} from '../../../../shared/patterns';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-card-face',
    templateUrl: './card-face.component.html',
    styleUrls: ['./card-face.component.css']
})
export class CardFaceComponent implements OnInit, OnDestroy {

    @Input() parent: FormGroup;

    constructor() {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

}
