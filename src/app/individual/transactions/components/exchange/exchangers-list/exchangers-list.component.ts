import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IssuersService} from '../../../../../_services/issuers.service';

@Component({
    selector: 'app-exchangers-list',
    templateUrl: './exchangers-list.component.html',
    styleUrls: ['./exchangers-list.component.less']
})
export class ExchangersListComponent implements OnInit {

    /** Ids of issuers participating in exchange */
    @Input() issuersIsd = null;
    @Output() selectExchanger = new EventEmitter();
    @Output() back = new EventEmitter();

    /** List of exchangers */
    exchangers = null;

    constructor(private issuersService: IssuersService) {
    }

    ngOnInit() {
        this.getExchangers();
    }

    /**
     * Gets list of exchangers from API
     */
    getExchangers() {
        this.issuersService.getExchangers({
            inIssuerId: this.issuersIsd.inIssuerId,
            outIssuerId: this.issuersIsd.outIssuerId
        }).then(data => this.exchangers = data.records).catch(() => this.exchangers = []);
    }

    /**
     * Sends selected exchanger to the next step
     * @param exchanger Selected exchanger
     */
    onNext(exchanger) {
        this.selectExchanger.emit(exchanger);
    }


    onBack() {
        this.back.emit();
    }

}
