import { initDB } from '../database/db';
import { Coffee } from '../models/Coffee';

export class CoffeeDAO {
  async saveCoffee(coffee: Coffee): Promise<void> {
    const db = await initDB();
    await db.put('coffees', {
      name: coffee.name,
      basePrice: coffee.basePrice,
      ingredients: coffee.ingredients,
      customizations: coffee.customizations.map(c => ({
        name: c.name,
        price: c.price,
      })),
    });
  }

  async getCoffee(name: string): Promise<any | undefined> {
    const db = await initDB();
    return await db.get('coffees', name);
  }
}