export class Bundle {
    id: number;
    key: string;
    values: BundleValue[];
}

export class BundleValue {
    locale: string;
    value: string;
}
