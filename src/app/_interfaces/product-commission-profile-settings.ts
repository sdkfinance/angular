import {Product} from "./product";

export interface ProductCommissionProfileSettings {
    id: string;
    product: Product;
    collector: string;
    active: boolean;
    value: {
        type: string;
        valuePercent: number;
        valueFixed: number;
    };
}
