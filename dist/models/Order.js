"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
class Order {
    constructor(id, coffees, createdAt = new Date()) {
        this.id = id;
        this.coffees = coffees;
        this.createdAt = createdAt;
    }
    getTotalPrice() {
        return this.coffees.reduce((total, coffee) => total + coffee.getPrice(), 0);
    }
}
exports.Order = Order;
