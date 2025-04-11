"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CoffeeService_1 = require("./services/CoffeeService");
async function main() {
    console.log('Bienvenue dans notre café magique ! ☕');
    // Créer un service
    const service = new CoffeeService_1.CoffeeService();
    // Ajouter des ingrédients à l’inventaire
    service.addIngredientToInventory('coffee', 1000);
    service.addIngredientToInventory('milk', 500);
    service.addIngredientToInventory('sugar', 200);
    service.addIngredientToInventory('foam', 300);
    console.log('Inventaire initialisé avec des ingrédients !');
    // Créer les cafés et attendre qu’ils soient enregistrés
    const espresso = await service.createCoffee('espresso');
    console.log('Café Espresso créé !');
    const latte = await service.createCoffee('latte');
    console.log('Café Latte créé !');
    // Ajouter des personnalisations
    await service.addCustomization('espresso', 'sugar');
    console.log('Sucre ajouté à l’Espresso !');
    await service.addCustomization('latte', 'whipped-cream');
    console.log('Crème fouettée ajoutée au Latte !');
    // Créer une commande
    const order = await service.createOrder(['espresso', 'latte']);
    console.log(`Commande ${order.id} créée !`);
    console.log('Détails de la commande :');
    if (order.coffees.length === 0) {
        console.log('Aucun café dans la commande !');
    }
    else {
        order.coffees.forEach(coffee => {
            const customNames = coffee.customizations.map(c => c.name).join(', ') || 'aucune';
            console.log(`- ${coffee.name} avec ${customNames}, Prix : ${coffee.getPrice()}€`);
        });
    }
    console.log(`Prix total : ${order.getTotalPrice()}€`);
}
main().catch(error => console.error('Oups, une erreur !', error));
