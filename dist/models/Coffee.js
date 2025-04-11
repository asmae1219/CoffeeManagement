"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cappuccino = exports.Latte = exports.Espresso = exports.Coffee = void 0;
class Coffee {
    constructor(name, basePrice, ingredients, customizations = []) {
        this.name = name;
        this.basePrice = basePrice;
        this.ingredients = ingredients;
        this.customizations = customizations;
    }
    addCustomization(customization) {
        this.customizations.push(customization);
    }
    getPrice() {
        const customizationPrice = this.customizations.reduce((total, c) => total + c.price, 0);
        return this.basePrice + customizationPrice;
    }
}
exports.Coffee = Coffee;
class Espresso extends Coffee {
    constructor() {
        super('Espresso', 2.5, [{ name: 'coffee', quantity: 10 }]);
    }
}
exports.Espresso = Espresso;
class Latte extends Coffee {
    constructor() {
        super('Latte', 3.5, [
            { name: 'coffee', quantity: 10 },
            { name: 'milk', quantity: 50 },
        ]);
    }
}
exports.Latte = Latte;
class Cappuccino extends Coffee {
    constructor() {
        super('Cappuccino', 4.0, [
            { name: 'coffee', quantity: 10 },
            { name: 'milk', quantity: 30 },
            { name: 'foam', quantity: 20 },
        ]);
    }
}
exports.Cappuccino = Cappuccino;
