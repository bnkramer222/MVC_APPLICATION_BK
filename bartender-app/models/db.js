const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, '..', 'bartender.db'));

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS cocktails (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cocktailId INTEGER NOT NULL,
    cocktailName TEXT NOT NULL,
    patronName TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending',
    timestamp TEXT NOT NULL,
    FOREIGN KEY (cocktailId) REFERENCES cocktails(id)
  );
`);

// Seed cocktails table only if it's empty
const count = db.prepare('SELECT COUNT(*) AS count FROM cocktails').get().count;
if (count === 0) {
  const insert = db.prepare('INSERT INTO cocktails (name, description, price) VALUES (?, ?, ?)');
  insert.run('Margarita', 'Tequila, lime, triple sec', 9.50);
  insert.run('Mojito', 'Rum, mint, lime, soda', 8.00);
  insert.run('Old Fashioned', 'Whiskey, bitters, sugar', 11.00);
  insert.run('Daiquiri', 'Rum, lime, sugar', 7.50);
}

module.exports = db;