const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const mysql = require("mysql2");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

const db = mysql.createConnection({
  host: '127.0.0.1', 
  user: 'root',       
  password: '',       
  database: 'shopping_cart1'  
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database");
});

app.get("/products", (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

app.post("/add-to-cart", (req, res) => {
  const { user_id, product_id, quantity, price } = req.body;
  const sql = `INSERT INTO cart (User_ID, Product_ID, quantity, price) VALUES (?, ?, ?, ?)`;
  db.query(sql, [user_id, product_id, quantity, price], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send("Product added to cart!");
    }
  });
});

app.get("/cart/:user_id", (req, res) => {
  const { user_id } = req.params;
  const sql = `SELECT c.Cart_ID, c.User_ID, p.Product_name, c.quantity, c.price
               FROM cart c
               JOIN products p ON c.Product_ID = p.Product_ID
               WHERE c.User_ID = ?`;
  db.query(sql, [user_id], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

app.delete("/remove-from-cart/:cart_id", (req, res) => {
  const { cart_id } = req.params;
  const sql = `DELETE FROM cart WHERE Cart_ID = ?`;
  db.query(sql, [cart_id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send("Product removed from cart!");
    }
  });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
