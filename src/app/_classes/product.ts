import {MeasureUnit} from "./measure-unit";
export class Product {
    id: number;
    externalCode: string;
    name: string;
    description: string;
    measureUnit: MeasureUnit;

    constructor(product?: Product) {
        if (product) {
            this.id = product.id;
            this.externalCode = product.externalCode;
            this.name = product.name;
            this.description = product.description;
            this.measureUnit = new MeasureUnit(product.measureUnit);
        }
    }
}
