"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDB = initDB;
const idb_1 = require("idb");
require("fake-indexeddb/auto"); // Ajout pour simuler IndexedDB
async function initDB() {
    const db = await (0, idb_1.openDB)('coffee-shop-db', 1, {
        upgrade(db) {
            db.createObjectStore('coffees', { keyPath: 'name' });
            db.createObjectStore('orders', { keyPath: 'id' });
        },
    });
    return db;
}
