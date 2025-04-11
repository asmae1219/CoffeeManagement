"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoffeeDAO = void 0;
const db_1 = require("../database/db");
class CoffeeDAO {
    async saveCoffee(coffee) {
        const db = await (0, db_1.initDB)();
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
    async getCoffee(name) {
        const db = await (0, db_1.initDB)();
        return await db.get('coffees', name);
    }
}
exports.CoffeeDAO = CoffeeDAO;
