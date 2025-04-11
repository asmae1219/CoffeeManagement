import { Ingredient } from './Ingredient';

export class InventoryManager {
  private static instance: InventoryManager;
  private ingredients: Map<string, Ingredient> = new Map();

  private constructor() {}

  static getInstance(): InventoryManager {
    if (!InventoryManager.instance) {
      InventoryManager.instance = new InventoryManager();
    }
    return InventoryManager.instance;
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.set(ingredient.name, ingredient);
  }

  updateQuantity(name: string, quantity: number): void {
    const ingredient = this.ingredients.get(name);
    if (ingredient) {
      ingredient.quantity = quantity;
    }
  }

  getIngredient(name: string): Ingredient | undefined {
    return this.ingredients.get(name);
  }
}