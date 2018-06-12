import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IssuersService} from "../../../../_services/issuers.service";

@Component({
    selector: 'app-loyalty-rules-creating-adding-issuer',
    templateUrl: './loyalty-rules-creating-adding-issuer.component.html',
    styles: []
})
export class LoyaltyRulesCreatingAddingIssuerComponent implements OnInit {

    @Output() selectedIssuerUpdate: EventEmitter<any> = new EventEmitter();

    issuers = null;
    issuersTitle: string = "Issuer";

    constructor(private issuersService: IssuersService) {
    }

    ngOnInit() {
        this.getIssuers();
    }

    getIssuers() {
        this.issuersService.getIssuers()
            .then(res => {
                this.issuers = res.records;
                this.updateSelectedIssuer(this.issuers[0]);
                this.issuersTitle = this.issuers[0].name;
            })
            .catch(error => console.log(error));
    }

    updateSelectedIssuer(issuer) {
        this.issuersTitle = issuer.name;
        this.selectedIssuerUpdate.emit(issuer);
    }

    clearSelectedIssuer() {
        this.issuersTitle = this.issuers[0].name;
        this.updateSelectedIssuer(this.issuers[0]);
    }

}
