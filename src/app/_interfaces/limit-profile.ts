export interface LimitProfile {
    id: string;
    commissionProfileId: string;
    qualifier: string;
    timeUnit: string;
    value: number;
    active: boolean;
}
