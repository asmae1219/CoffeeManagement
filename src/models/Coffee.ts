import { Customization } from './Customization';

export abstract class Coffee {
  protected constructor(
    public name: string,
    public basePrice: number,
    public ingredients: { name: string; quantity: number }[],
    public customizations: Customization[] = []
  ) {}

  addCustomization(customization: Customization): void {
    this.customizations.push(customization);
  }

  getPrice(): number {
    const customizationPrice = this.customizations.reduce(
      (total, c) => total + c.price,
      0
    );
    return this.basePrice + customizationPrice;
  }
}

export class Espresso extends Coffee {
  constructor() {
    super('Espresso', 2.5, [{ name: 'coffee', quantity: 10 }]);
  }
}

export class Latte extends Coffee {
  constructor() {
    super('Latte', 3.5, [
      { name: 'coffee', quantity: 10 },
      { name: 'milk', quantity: 50 },
    ]);
  }
}

export class Cappuccino extends Coffee {
  constructor() {
    super('Cappuccino', 4.0, [
      { name: 'coffee', quantity: 10 },
      { name: 'milk', quantity: 30 },
      { name: 'foam', quantity: 20 },
    ]);
  }
}