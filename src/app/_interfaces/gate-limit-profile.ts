import {Product} from "./product";

export interface GateLimitProfile {
    id: string;
    gateProfileId: string;
    txType: string;
    product: Product;
    qualifier: string;
    timeUnit: string;
    value: number;
    active: boolean;
}
