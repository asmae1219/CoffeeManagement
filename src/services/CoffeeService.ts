import { Coffee, Espresso, Latte, Cappuccino } from '../models/Coffee';
import { Customization, Milk, Sugar, WhippedCream } from '../models/Customization';
import { Order } from '../models/Order';
import { InventoryManager } from '../models/InventoryManager';
import { CoffeeDAO } from '../dao/CoffeeDAO';
import { OrderDAO } from '../dao/OrderDAO';
import { Ingredient } from '../models/Ingredient';

export class CoffeeService {
  private coffeeDAO: CoffeeDAO;
  private orderDAO: OrderDAO;
  private inventory: InventoryManager;

  constructor() {
    this.coffeeDAO = new CoffeeDAO();
    this.orderDAO = new OrderDAO();
    this.inventory = InventoryManager.getInstance();
  }

  async createCoffee(type: 'espresso' | 'latte' | 'cappuccino'): Promise<Coffee> {
    let coffee: Coffee;
    switch (type) {
      case 'espresso':
        coffee = new Espresso();
        break;
      case 'latte':
        coffee = new Latte();
        break;
      case 'cappuccino':
        coffee = new Cappuccino();
        break;
      default:
        throw new Error('Type de café inconnu');
    }
    await this.coffeeDAO.saveCoffee(coffee);
    return coffee;
  }

  async addCustomization(coffeeName: string, customizationType: 'milk' | 'sugar' | 'whipped-cream'): Promise<void> {
    // Normaliser le nom pour correspondre à IndexedDB (première lettre en majuscule)
    const normalizedName = coffeeName.charAt(0).toUpperCase() + coffeeName.slice(1);
    const coffeeData = await this.coffeeDAO.getCoffee(normalizedName);
    if (!coffeeData) throw new Error('Café non trouvé');

    let customization: Customization;
    switch (customizationType) {
      case 'milk':
        customization = new Milk();
        break;
      case 'sugar':
        customization = new Sugar();
        break;
      case 'whipped-cream':
        customization = new WhippedCream();
        break;
      default:
        throw new Error('Personnalisation inconnue');
    }

    const coffeeClass = coffeeData.name === 'Espresso' ? Espresso : coffeeData.name === 'Latte' ? Latte : Cappuccino;
    const coffee = new coffeeClass();
    // Charger les personnalisations existantes
    if (coffeeData.customizations && coffeeData.customizations.length > 0) {
      coffeeData.customizations.forEach((c: { name: string; price: number }) => {
        coffee.addCustomization(new Customization(c.name, c.price));
      });
    }
    // Ajouter la nouvelle personnalisation
    coffee.addCustomization(customization);
    await this.coffeeDAO.saveCoffee(coffee);
  }

  async createOrder(coffeeNames: string[]): Promise<Order> {
    const coffees: Coffee[] = [];
    for (const name of coffeeNames) {
      // Normaliser le nom pour correspondre à IndexedDB (première lettre en majuscule)
      const normalizedName = name.charAt(0).toUpperCase() + name.slice(1);
      const coffeeData = await this.coffeeDAO.getCoffee(normalizedName);
      if (coffeeData) {
        const coffeeClass = coffeeData.name === 'Espresso' ? Espresso : coffeeData.name === 'Latte' ? Latte : Cappuccino;
        const coffee = new coffeeClass();
        if (coffeeData.customizations && coffeeData.customizations.length > 0) {
          coffeeData.customizations.forEach((c: { name: string; price: number }) => {
            coffee.addCustomization(new Customization(c.name, c.price));
          });
        }
        coffees.push(coffee);
      } else {
        console.log(`Café ${name} non trouvé dans la base, création d’un nouveau`);
        const newCoffee = await this.createCoffee(name as 'espresso' | 'latte' | 'cappuccino');
        coffees.push(newCoffee);
      }
    }
    const order = new Order(`order-${Date.now()}`, coffees);
    await this.orderDAO.saveOrder(order);
    return order;
  }

  addIngredientToInventory(name: string, quantity: number): void {
    this.inventory.addIngredient(new Ingredient(name, quantity));
  }
}