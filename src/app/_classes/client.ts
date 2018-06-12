export class Client {
  id: string;
  email: string;
  card: string;
  date: Date;
  status: string;
  role: string;

  constructor(client?: Client) {
    if(client) {
      this.id = client.id;
      this.email = client.email;
      this.card = client.card;
      this.date = client.date;
      this.status = client.status;
      this.role = client.role;
    }
  }
}
