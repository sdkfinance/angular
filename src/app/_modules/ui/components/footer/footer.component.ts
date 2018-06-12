import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {I18nService} from '../../../../_services/i18n.service';
import {I18N_LOCALES} from '../../../../app.constants';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {

    currentLocale;

    locales = I18N_LOCALES;

    listIsShown = false;

    constructor(private i18nService: I18nService, private _eref: ElementRef) {
    }

    ngOnInit() {
        this.currentLocale = this.i18nService.getCurrentLocale();
    }

    @HostListener('document:click', ['$event'])
    onClick(event: Event) {
        if (!this._eref.nativeElement.contains(event.target)) {
            this.listIsShown = false;
        }
    }

    onToggle() {
        this.listIsShown = !this.listIsShown;
    }

    onChangeLocale(locale) {
        this.listIsShown = false;
        this.currentLocale = locale;
        this.i18nService.setCurrentLocale(locale);
    }

}
