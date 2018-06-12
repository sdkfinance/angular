export interface GateCommissionProfileSettings {
    id: string;
    txType: string;
    collector: string;
    active: boolean;
    value: {
        type: string;
        valuePercent: number;
        valueFixed: number;
    };
}
