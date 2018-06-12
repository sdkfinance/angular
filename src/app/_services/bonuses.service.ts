import {Injectable} from '@angular/core';

@Injectable()
export class BonusesService {
    currentBonusCoin: any;

    constructor() {
    }

    setBonusCoin(val) {
        this.currentBonusCoin = val;
    }

    getBonusCoin() {
        return this.currentBonusCoin;
    }

}
