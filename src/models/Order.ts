import { Coffee } from './Coffee';

export class Order {
  constructor(
    public id: string,
    public coffees: Coffee[],
    public createdAt: Date = new Date()
  ) {}

  getTotalPrice(): number {
    return this.coffees.reduce((total, coffee) => total + coffee.getPrice(), 0);
  }
}