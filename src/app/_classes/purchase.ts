export class Purchase {
  title: string;
  date: Date;
  count: number;
  units: string;
  price: number;

  constructor(purchase?: Purchase) {
    if (purchase) {
      this.title = purchase.title;
      this.date = purchase.date;
      this.count = purchase.count;
      this.units = purchase.units;
      this.price = purchase.price;
    }
  }
}
