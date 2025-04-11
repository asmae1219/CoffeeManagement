"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDAO = void 0;
const db_1 = require("../database/db");
class OrderDAO {
    async saveOrder(order) {
        const db = await (0, db_1.initDB)();
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
    async getOrder(id) {
        const db = await (0, db_1.initDB)();
        return await db.get('orders', id);
    }
}
exports.OrderDAO = OrderDAO;
