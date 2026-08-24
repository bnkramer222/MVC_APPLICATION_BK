const db = require('./db');

function createOrder(cocktailId, cocktailName, patronName) {
  const stmt = db.prepare(`
    INSERT INTO orders (cocktailId, cocktailName, patronName, status, timestamp)
    VALUES (?, ?, ?, 'Pending', ?)
  `);
  const info = stmt.run(cocktailId, cocktailName, patronName, new Date().toISOString());
  return getOrderById(info.lastInsertRowid);
}

function getAllOrders() {
  return db.prepare('SELECT * FROM orders ORDER BY id DESC').all();
}

function getOrderById(id) {
  return db.prepare('SELECT * FROM orders WHERE id = ?').get(id);
}

function updateOrderStatus(id, status) {
  db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, id);
  return getOrderById(id);
}

module.exports = { createOrder, getAllOrders, getOrderById, updateOrderStatus };