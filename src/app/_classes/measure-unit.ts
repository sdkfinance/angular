export class MeasureUnit {
    id: number;
    externalCode: string;
    code: string;
    description: string;

    constructor(measureUnit?: MeasureUnit) {
        if (measureUnit) {
            this.id = measureUnit.id;
            this.externalCode = measureUnit.externalCode;
            this.code = measureUnit.code;
            this.description = measureUnit.description;
        }
    }
}
