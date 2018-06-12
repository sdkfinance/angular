import {Injectable} from '@angular/core';
import {CommissionProfile} from '../../../_interfaces/commission-profile';
import {LimitProfile} from '../../../_interfaces/limit-profile';
import {GateCommissionProfile} from '../../../_interfaces/gate-commission-profile';
import {GateLimitProfile} from '../../../_interfaces/gate-limit-profile';
import {Product} from '../../../_interfaces/product';

/**
 * Service stores data for transmission between components
 */
@Injectable()
export class ContractManagementService {

    private _commissionProfile: CommissionProfile;
    private _limitProfile: LimitProfile;
    private _contractId: string;
    /** Settings of gate commission profile with one txType */
    private _gateCommissionProfileSettings;
    private _allowedTxTypes: string[];
    private _gateCommissionProfile: GateCommissionProfile;
    private _gateLimitProfile: GateLimitProfile;
    /** Settings of product commission profile for one product */
    private _productCommissionProfileSettings;
    private _products: Product[];
    private _product: Product;

    constructor() {
    }

    get commissionProfile(): CommissionProfile {
        return this._commissionProfile;
    }

    set commissionProfile(value: CommissionProfile) {
        this._commissionProfile = value;
    }

    get limitProfile(): LimitProfile {
        return this._limitProfile;
    }

    set limitProfile(value: LimitProfile) {
        this._limitProfile = value;
    }

    get contractId(): string {
        return this._contractId;
    }

    set contractId(value: string) {
        this._contractId = value;
    }

    get gateCommissionProfileSettings() {
        return this._gateCommissionProfileSettings;
    }

    set gateCommissionProfileSettings(value) {
        this._gateCommissionProfileSettings = value;
    }

    get allowedTxTypes(): string[] {
        return this._allowedTxTypes;
    }

    set allowedTxTypes(value: string[]) {
        this._allowedTxTypes = value;
    }

    get gateLimitProfile(): GateLimitProfile {
        return this._gateLimitProfile;
    }

    set gateLimitProfile(value: GateLimitProfile) {
        this._gateLimitProfile = value;
    }

    get gateCommissionProfile(): GateCommissionProfile {
        return this._gateCommissionProfile;
    }

    set gateCommissionProfile(value: GateCommissionProfile) {
        this._gateCommissionProfile = value;
    }

    get productCommissionProfileSettings() {
        return this._productCommissionProfileSettings;
    }

    set productCommissionProfileSettings(value) {
        this._productCommissionProfileSettings = value;
    }

    get products() {
        return this._products;
    }

    set products(value) {
        this._products = value;
    }

    get product(): Product {
        return this._product;
    }

    set product(value: Product) {
        this._product = value;
    }

}
