const db = require('./db');

function getAllCocktails() {
  return db.prepare('SELECT * FROM cocktails').all();
}

function getCocktailById(id) {
  return db.prepare('SELECT * FROM cocktails WHERE id = ?').get(id);
}

module.exports = { getAllCocktails, getCocktailById };