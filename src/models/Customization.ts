export class Customization {
  constructor(
    public name: string,
    public price: number
  ) {}
}

export class Milk extends Customization {
  constructor() {
    super('Milk', 0.5);
  }
}

export class Sugar extends Customization {
  constructor() {
    super('Sugar', 0.2);
  }
}

export class WhippedCream extends Customization {
  constructor() {
    super('Whipped Cream', 1.0);
  }
}