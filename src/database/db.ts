import { openDB, DBSchema } from 'idb';
import 'fake-indexeddb/auto'; // Ajout pour simuler IndexedDB
interface CoffeeShopDB extends DBSchema {
  coffees: {
    key: string;
    value: {
      name: string;
      basePrice: number;
      ingredients: { name: string; quantity: number }[];
      customizations: { name: string; price: number }[];
    };
  };
  orders: {
    key: string;
    value: {
      id: string;
      coffees: {
        name: string;
        basePrice: number;
        ingredients: { name: string; quantity: number }[];
        customizations: { name: string; price: number }[];
      }[];
      createdAt: string;
    };
  };
}

export async function initDB() {
  const db = await openDB<CoffeeShopDB>('coffee-shop-db', 1, {
    upgrade(db) {
      db.createObjectStore('coffees', { keyPath: 'name' });
      db.createObjectStore('orders', { keyPath: 'id' });
    },
  });
  return db;
}