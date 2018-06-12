export class Pos {
    id?: string;
    name: string;
    description: string;

    constructor(pos?: Pos) {
        this.id = null;
        if (pos) {
            this.id = pos.id || null;
            this.name = pos.name;
            this.description = pos.description;
        }
    }


    createBody() {
        return {
            name: this.name,
            description: this.description,
            website: null,
            resultUrl: null,
            serverUrl: null,
            trustAllCertificates: false
        };
    }
}
