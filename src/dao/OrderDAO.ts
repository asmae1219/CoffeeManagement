import { initDB } from '../database/db';
import { Order } from '../models/Order';

export class OrderDAO {
  async saveOrder(order: Order): Promise<void> {
    const db = await initDB();
    await db.put('orders', {
      id: order.id,
      coffees: order.coffees.map(coffee => ({
        name: coffee.name,
        basePrice: coffee.basePrice,
        ingredients: coffee.ingredients,
        customizations: coffee.customizations.map(c => ({
          name: c.name,
          price: c.price,
        })),
      })),
      createdAt: order.createdAt.toISOString(),
    });
  }

  async getOrder(id: string): Promise<any | undefined> {
    const db = await initDB();
    return await db.get('orders', id);
  }
}