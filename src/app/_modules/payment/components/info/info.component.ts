import {Component, OnInit, Input, HostListener, ElementRef} from '@angular/core';

@Component({
    selector: 'app-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
    @Input() message: string;
    show: boolean =  false;

    constructor(private _eref: ElementRef) {
    }

    ngOnInit() {
    }

    @HostListener('document:click', ['$event'])
    onClick(event: Event) {
        if (!this._eref.nativeElement.contains(event.target)) {
            this.show = false;
        }
    }
}
