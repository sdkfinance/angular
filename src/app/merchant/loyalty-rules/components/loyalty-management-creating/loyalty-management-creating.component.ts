import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CoinsService} from '../../../../_services/coins.service';
import {Coin} from '../../../../_classes/coin';
import {MediaFilesService} from '../../../../_services/media-files.service';
import {LoyaltyRulesService} from '../../../../_services/loyalty-rules.service';
import {Title} from '@angular/platform-browser';
import {PAGE_TITLES, WINDOW_TITLE} from '../../../../app.constants';
import {TitleService} from '../../../../_services/title.service';
import {SnackBarService} from '../../../../_services/snack-bar.service';
import {MatSnackBar} from '@angular/material';
import {SnackBarComponent} from '../../../../_modules/ui/components/snack-bar/snack-bar.component';

@Component({
    selector: 'app-loyalty-management-creating',
    templateUrl: './loyalty-management-creating.component.html',
    styleUrls: ['./loyalty-management-creating.component.less']
})
export class LoyaltyManagementCreatingComponent implements OnInit {

    @ViewChild('selectedValueType') selectedValueType;
    @ViewChild('selectCoin') selectCoin;
    @ViewChild('selectActivationPolicy') selectActivationPolicy;

    loyaltyRulesForm: FormGroup;
    coins: Coin[] = null;
    files: File[] = [];
    fileIds: string[] = [];
    waiting: boolean = false;

    constructor(private fb: FormBuilder, private coinsService: CoinsService,
                private mediaFilesService: MediaFilesService,
                private loyaltyRuleService: LoyaltyRulesService,
                private titleService: Title,
                public snackBarComponent: MatSnackBar,
                private snackBarService: SnackBarService) {
        this.titleService.setTitle(PAGE_TITLES.loyaltyRules);
        TitleService.setTitle(WINDOW_TITLE.loyaltyRules);
    }

    ngOnInit() {
        this.createForm();
        this.getCoinsFromHttp();
    }

    createForm() {
        this.loyaltyRulesForm = this.fb.group({
            nameEn: '',
            nameUk: '',
            descriptionEn: '',
            descriptionUk: '',
            active: false,
            startsAt: '',
            endsAt: '',
            valueType: '',
            value: '',
            merchantBonusCoin: '',
            activationPolicy: '',
            files: []
        });
    }

    updateValueType(valueType) {
        this.loyaltyRulesForm.get('valueType').setValue(valueType.value);
    }

    updateActivationPolicy(activationPolicy) {
        this.loyaltyRulesForm.get('activationPolicy').setValue(activationPolicy.value);
    }

    updateCoin(coin: Coin) {
        this.loyaltyRulesForm.get('merchantBonusCoin').setValue(coin.serial);
    }

    getCoinsFromHttp() {
        this.coinsService.getCoins()
            .then(response => {
                this.coins = response.coins;
            })
            .catch(error => console.log(error));
    }

    onCreate() {
        this.waiting = true;
        if (this.files.length) {
            for (let i = 0; i < this.files.length; i++) {
                this.mediaFilesService.uploadFile(this.files[i])
                    .then(res => {
                        this.fileIds.push(res.file.id);
                        if (i == (this.files.length - 1)) {
                            this.createLoyaltyRule();
                        }
                    })
                    .catch(error => {
                        this.waiting = false;
                    });
            }
        } else {
            this.createLoyaltyRule();
        }

    }

    onChange(event) {
        this.files = event.srcElement.files;
    }

    createLoyaltyRule() {
        this.loyaltyRuleService.createLoyaltyRule(this.createLoyaltyRuleRequestBody())
            .then(res => {
                this.waiting = false;
                this.resetForm();
                this.openSnackBarComponent();
            })
            .catch(error => {
                this.waiting = false;
            });
    }

    resetForm() {
        this.loyaltyRulesForm.reset();
        this.files = [];
        this.fileIds = [];

        this.selectActivationPolicy.clearSelectedActivationPolicy();
        this.selectedValueType.clearSelectedValueType();
        this.selectCoin.clearSelectedCoin();
    }

    createLoyaltyRuleRequestBody() {
        return {
            type: 'BONUS',
            names: [
                {
                    locale: 'en',
                    value: this.loyaltyRulesForm.get('nameEn').value
                },
                {
                    locale: 'uk',
                    value: this.loyaltyRulesForm.get('nameUk').value
                },
            ],
            descriptions: [
                {
                    locale: 'en',
                    value: this.loyaltyRulesForm.get('descriptionEn').value
                },
                {
                    locale: 'uk',
                    value: this.loyaltyRulesForm.get('descriptionUk').value
                }
            ],
            active: this.loyaltyRulesForm.get('active').value,
            startsAt: this.loyaltyRulesForm.get('startsAt').value + 'T00:00:00.567Z',
            endsAt: this.loyaltyRulesForm.get('endsAt').value ? this.loyaltyRulesForm.get('endsAt').value + 'T00:00:00.567Z' : '',
            valueType: this.loyaltyRulesForm.get('valueType').value,
            value: this.getValue(),
            merchantBonusCoinSerial: this.loyaltyRulesForm.get('merchantBonusCoin').value,
            activationPolicy: this.loyaltyRulesForm.get('activationPolicy').value,
            fileIds: this.fileIds
        }
    }

    getValue() {
        if (this.loyaltyRulesForm.get('valueType').value == 'PERCENT')
            return this.loyaltyRulesForm.get('value').value / 100;
        else if (this.loyaltyRulesForm.get('valueType').value == 'FIXED')
            return this.loyaltyRulesForm.get('value').value;
        else return '';
    };

    openSnackBarComponent() {
        this.snackBarService.setMessage('Rule created!');
        this.snackBarService.setAction('create');
        this.snackBarComponent.openFromComponent(SnackBarComponent, {
            duration: 1100
        });
    }
}
