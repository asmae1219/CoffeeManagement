"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoffeeService = void 0;
const Coffee_1 = require("../models/Coffee");
const Customization_1 = require("../models/Customization");
const Order_1 = require("../models/Order");
const InventoryManager_1 = require("../models/InventoryManager");
const CoffeeDAO_1 = require("../dao/CoffeeDAO");
const OrderDAO_1 = require("../dao/OrderDAO");
const Ingredient_1 = require("../models/Ingredient");
class CoffeeService {
    constructor() {
        this.coffeeDAO = new CoffeeDAO_1.CoffeeDAO();
        this.orderDAO = new OrderDAO_1.OrderDAO();
        this.inventory = InventoryManager_1.InventoryManager.getInstance();
    }
    async createCoffee(type) {
        let coffee;
        switch (type) {
            case 'espresso':
                coffee = new Coffee_1.Espresso();
                break;
            case 'latte':
                coffee = new Coffee_1.Latte();
                break;
            case 'cappuccino':
                coffee = new Coffee_1.Cappuccino();
                break;
            default:
                throw new Error('Type de café inconnu');
        }
        await this.coffeeDAO.saveCoffee(coffee);
        return coffee;
    }
    async addCustomization(coffeeName, customizationType) {
        // Normaliser le nom pour correspondre à IndexedDB (première lettre en majuscule)
        const normalizedName = coffeeName.charAt(0).toUpperCase() + coffeeName.slice(1);
        const coffeeData = await this.coffeeDAO.getCoffee(normalizedName);
        if (!coffeeData)
            throw new Error('Café non trouvé');
        let customization;
        switch (customizationType) {
            case 'milk':
                customization = new Customization_1.Milk();
                break;
            case 'sugar':
                customization = new Customization_1.Sugar();
                break;
            case 'whipped-cream':
                customization = new Customization_1.WhippedCream();
                break;
            default:
                throw new Error('Personnalisation inconnue');
        }
        const coffeeClass = coffeeData.name === 'Espresso' ? Coffee_1.Espresso : coffeeData.name === 'Latte' ? Coffee_1.Latte : Coffee_1.Cappuccino;
        const coffee = new coffeeClass();
        // Charger les personnalisations existantes
        if (coffeeData.customizations && coffeeData.customizations.length > 0) {
            coffeeData.customizations.forEach((c) => {
                coffee.addCustomization(new Customization_1.Customization(c.name, c.price));
            });
        }
        // Ajouter la nouvelle personnalisation
        coffee.addCustomization(customization);
        await this.coffeeDAO.saveCoffee(coffee);
    }
    async createOrder(coffeeNames) {
        const coffees = [];
        for (const name of coffeeNames) {
            // Normaliser le nom pour correspondre à IndexedDB (première lettre en majuscule)
            const normalizedName = name.charAt(0).toUpperCase() + name.slice(1);
            const coffeeData = await this.coffeeDAO.getCoffee(normalizedName);
            if (coffeeData) {
                const coffeeClass = coffeeData.name === 'Espresso' ? Coffee_1.Espresso : coffeeData.name === 'Latte' ? Coffee_1.Latte : Coffee_1.Cappuccino;
                const coffee = new coffeeClass();
                if (coffeeData.customizations && coffeeData.customizations.length > 0) {
                    coffeeData.customizations.forEach((c) => {
                        coffee.addCustomization(new Customization_1.Customization(c.name, c.price));
                    });
                }
                coffees.push(coffee);
            }
            else {
                console.log(`Café ${name} non trouvé dans la base, création d’un nouveau`);
                const newCoffee = await this.createCoffee(name);
                coffees.push(newCoffee);
            }
        }
        const order = new Order_1.Order(`order-${Date.now()}`, coffees);
        await this.orderDAO.saveOrder(order);
        return order;
    }
    addIngredientToInventory(name, quantity) {
        this.inventory.addIngredient(new Ingredient_1.Ingredient(name, quantity));
    }
}
exports.CoffeeService = CoffeeService;
