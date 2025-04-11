"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhippedCream = exports.Sugar = exports.Milk = exports.Customization = void 0;
class Customization {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}
exports.Customization = Customization;
class Milk extends Customization {
    constructor() {
        super('Milk', 0.5);
    }
}
exports.Milk = Milk;
class Sugar extends Customization {
    constructor() {
        super('Sugar', 0.2);
    }
}
exports.Sugar = Sugar;
class WhippedCream extends Customization {
    constructor() {
        super('Whipped Cream', 1.0);
    }
}
exports.WhippedCream = WhippedCream;
