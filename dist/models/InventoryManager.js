"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryManager = void 0;
class InventoryManager {
    constructor() {
        this.ingredients = new Map();
    }
    static getInstance() {
        if (!InventoryManager.instance) {
            InventoryManager.instance = new InventoryManager();
        }
        return InventoryManager.instance;
    }
    addIngredient(ingredient) {
        this.ingredients.set(ingredient.name, ingredient);
    }
    updateQuantity(name, quantity) {
        const ingredient = this.ingredients.get(name);
        if (ingredient) {
            ingredient.quantity = quantity;
        }
    }
    getIngredient(name) {
        return this.ingredients.get(name);
    }
}
exports.InventoryManager = InventoryManager;
