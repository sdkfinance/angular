export class Pagination {
    pagesSize: number;
    allPagesSize: number;
    pageItemsCount: number;
    itemsArray: any = [];

    constructor(pag?: Pagination){
        if (pag){
            this.pagesSize = pag.pagesSize;
            this.allPagesSize = pag.allPagesSize;
            this.pageItemsCount = Math.ceil(pag.allPagesSize / pag.pagesSize);

            for (let i = 0; i < this.pageItemsCount; i++){
                this.itemsArray.push(i + 1);

            }
        }
    }
}
