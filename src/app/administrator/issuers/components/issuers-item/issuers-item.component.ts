import {Component, Input, OnInit} from '@angular/core';
import {Issuer} from "../../../../_interfaces/issuer";
import {IssuersService} from "../../../../_services/issuers.service";
import {IssuerService} from "../../servises/issuer.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-issuers-item',
    templateUrl: './issuers-item.component.html',
    styleUrls: ['./issuers-item.component.less']
})
export class IssuersItemComponent implements OnInit {

    @Input() issuer: Issuer;

    constructor(private issuersService: IssuersService, private issuerService: IssuerService,
                private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
    }

    updateIssuer(active: boolean,
                 name: string = this.issuer.name,
                 description: string = this.issuer.description,
                 orderNumber: number = this.issuer.orderNumber,
                 orderQuote: number = this.issuer.orderQuote) {
        this.issuersService.updateIssuer(this.issuer.id, {
            name: name,
            description: description,
            active: active,
            orderNumber: orderNumber,
            orderQuote: orderQuote
        }).then(data => {
            this.issuer = <Issuer>data.issuer;
        }).catch();
    }

    onEdit() {
        this.issuerService.issuer = this.issuer;
        this.router.navigate(['./edit'], {relativeTo: this.route});
    }

}
