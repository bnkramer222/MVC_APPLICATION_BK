// Import the database connection
const db = require('./db');

// Save a new order in the database, starting with status "Pending"
function createOrder(cocktailId, cocktailName, patronName) {
  const stmt = db.prepare(`
    INSERT INTO orders (cocktailId, cocktailName, patronName, status, timestamp)
    VALUES (?, ?, ?, 'Pending', ?)
  `);
  const info = stmt.run(cocktailId, cocktailName, patronName, new Date().toISOString());
  // Return the order we just created, including its new id
  return getOrderById(info.lastInsertRowid);
}

// Get every order, newest first (used for the order queue page)
function getAllOrders() {
  return db.prepare('SELECT * FROM orders ORDER BY id DESC').all();
}

// Get one specific order by its id
function getOrderById(id) {
  return db.prepare('SELECT * FROM orders WHERE id = ?').get(id);
}

// Update an order's status (used when the bartender marks it "Ready for Pickup")
function updateOrderStatus(id, status) {
  db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, id);
  return getOrderById(id);
}

// Delete all orders (used when the bartender clears the queue)
function clearAllOrders() {
  db.prepare('DELETE FROM orders').run();
  // Reset the auto-increment counter so new orders start at 1 again
  db.prepare("DELETE FROM sqlite_sequence WHERE name = 'orders'").run();
}

// Make these functions available to controllers
module.exports = { createOrder, getAllOrders, getOrderById, updateOrderStatus, clearAllOrders };