export class To {
  id: string;
  stationName: string;
  transaction: string;
  date: Date;
  price: number;

  constructor(to?: To) {
    if (to) {
      this.id = to.id;
      this.stationName = to.stationName;
      this.transaction = to.transaction;
      this.date = to.date;
      this.price = to.price;
    }
  }
}
