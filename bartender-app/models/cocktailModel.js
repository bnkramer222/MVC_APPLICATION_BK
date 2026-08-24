// Import the database connection
const db = require('./db');

// Get every cocktail from the database (used for the menu page)
function getAllCocktails() {
  return db.prepare('SELECT * FROM cocktails').all();
}

// Get one specific cocktail by its id (used when checking an order)
function getCocktailById(id) {
  return db.prepare('SELECT * FROM cocktails WHERE id = ?').get(id);
}

// Make these functions available to controllers
module.exports = { getAllCocktails, getCocktailById };