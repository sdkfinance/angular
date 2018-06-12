import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ContactValidationService} from '../../../../../_services/contact-validation.service';
import {Form} from '../../../../../_classes/form/form';
import {OrganizationsService} from '../../../../../_services/organizations.service';
import {Coin} from '../../../../../_classes/coin';

@Component({
    selector: 'app-top-up-user',
    templateUrl: './top-up-user.component.html',
    styleUrls: ['./top-up-user.component.less']
})
export class TopUpUserComponent extends Form implements OnInit {

    /** The parent form */
    @Input() form: FormGroup;
    @Output() setCoins = new EventEmitter();

    waiting: boolean = false;

    constructor(private contactValidationService: ContactValidationService,
                private organizationsService: OrganizationsService) {
        super();
    }

    errors = {
        'contact.required': false,
        'contact.notFound': false,
        'contact.noCoins': false
    };

    ngOnInit() {
    }

    onNext() {
        if (this.checkErrors(['contact'])) {
            this.waiting = true;
            this.validateUser();
        }
    }

    /**
     * Makes a request to get the user organisation
     */
    validateUser() {
        this.contactValidationService.validateContact({
            value: this.form.get('contact').value
        }).then(data => {
            // data may not contain organizations
            try {
                this.getCoins((data as any).organizations[0].id);
            } catch (e) {
                this.waiting = false;
            }
        }).catch(error => {
            this.waiting = false;
            this.errors['contact.notFound'] = true;
        });
    }

    /**
     * Makes a request to get coins belonging to the user organisation
     * @param orgId
     */
    getCoins(orgId) {
        this.organizationsService.getCoinsForOrganization(orgId).then(data => {
            const coins = data.coins as Coin[];
            if (coins.length) {
                this.setCoins.emit(coins);
            } else {
                this.errors['contact.noCoins'] = true;
            }
            this.waiting = false;
        }).catch(error => {
            this.waiting = false;
        });
    }

}
