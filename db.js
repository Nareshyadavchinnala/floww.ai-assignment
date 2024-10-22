const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run(`CREATE TABLE categories (
    id INTEGER PRIMARY KEY,
    name TEXT,
    type TEXT
  )`);

  db.run(`CREATE TABLE transactions (
    id INTEGER PRIMARY KEY,
    type TEXT,
    category TEXT,
    amount REAL,
    date TEXT,
    description TEXT
  )`);
});

module.exports = db;
