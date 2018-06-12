import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-withdrawal-result',
    templateUrl: './withdrawal-result.component.html',
    styles: []
})
export class WithdrawalResultComponent implements OnInit {

    @Input() result;

    constructor(private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
    }

}
