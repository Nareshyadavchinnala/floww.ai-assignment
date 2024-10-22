const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();

app.use(bodyParser.json());

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


// Add a new transaction
app.post('/transactions', (req, res) => {
    const { type, category, amount, date, description } = req.body;
    db.run(`INSERT INTO transactions (type, category, amount, date, description) VALUES (?, ?, ?, ?, ?)`,
      [type, category, amount, date, description], function(err) {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
      });
  });
  
  // Retrieve all transactions
  app.get('/transactions', (req, res) => {
    db.all(`SELECT * FROM transactions`, [], (err, rows) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.json({ transactions: rows });
    });
  });
  
  // Retrieve a transaction by ID
  app.get('/transactions/:id', (req, res) => {
      const id = req.params.id;
      db.get(`SELECT * FROM transactions WHERE id = ?`, [id], (err, row) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        res.json({ transaction: row });
      });
    });
  
  // Update a transaction by ID
  app.put('/transactions/:id', (req, res) => {
      const id = req.params.id;
      const { type, category, amount, date, description } = req.body;
      db.run(`UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ? WHERE id = ?`,
        [type, category, amount, date, description, id], function(err) {
          if (err) {
            return res.status(400).json({ error: err.message });
          }
          res.json({ updatedID: id });
        });
    });
  
  // Delete a transaction by ID
  app.delete('/transactions/:id', (req, res) => {
      const id = req.params.id;
      db.run(`DELETE FROM transactions WHERE id = ?`, [id], function(err) {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        res.json({ deletedID: id });
      });
    });
  
  // Summary of transactions
  app.get('/summary', (req, res) => {
    db.all(`SELECT type, category, SUM(amount) as total FROM transactions GROUP BY type, category`, [], (err, rows) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.json({ summary: rows });
    });
  });


  app.post('/transactions', (req, res) => {
    const { type, category, amount, date, description } = req.body;
    if (!type || !category || !amount || !date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    db.run(`INSERT INTO transactions (type, category, amount, date, description) VALUES (?, ?, ?, ?, ?)`,
      [type, category, amount, date, description], function(err) {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
      });
  });
  
  