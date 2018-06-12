export class Pagination {
    constructor(public page: number = 0,
                public size: number = 20,
                public records: number = null,
                public totalPages: number = null) {
    }
}
