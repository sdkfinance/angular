import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Card} from '../../../../shared/card.model';
import {PATTERN} from '../../../../shared/patterns';
import {CardKeeperService} from '../../../../providers';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-card-back',
    templateUrl: './card-back.component.html',
    styleUrls: ['./card-back.component.css']
})
export class CardBackComponent implements OnInit, OnDestroy {

    @Input() parent: FormGroup;

    constructor() {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

}
