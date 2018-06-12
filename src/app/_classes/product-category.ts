export class ProductCategory {
    id: number;
    externalCode: string;
    name: string;
    description: string;

    constructor(category?: ProductCategory) {
        if (category) {
            this.id = category.id;
            this.externalCode = category.externalCode;
            this.name = category.name;
            this.description = category.description;
        }
    }
}
