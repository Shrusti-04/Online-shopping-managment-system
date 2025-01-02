const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: '127.0.0.1', 
  user: 'root',       
  password: '',       
  database: 'shopping_cart1'  
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});

const createProductsTable = `
CREATE TABLE IF NOT EXISTS products (
  Product_ID int(11) NOT NULL auto_increment,
  Product_name varchar(255) NOT NULL,
  Product_description text,
  price decimal(10,2) NOT NULL,
  stock_quantity int(11) NOT NULL,
  PRIMARY KEY  (Product_ID)
);`

const createCartTable = `
CREATE TABLE IF NOT EXISTS cart (
  Cart_ID int(11) NOT NULL auto_increment,
  User_ID int(11) NOT NULL,
  Product_ID int(11) NOT NULL,
  quantity int(11) NOT NULL,
  price decimal(10,2) NOT NULL,
  PRIMARY KEY  (Cart_ID),
  KEY Product_ID (Product_ID)
);`;

connection.query(createProductsTable, (err, results) => {
  if (err) {
    console.error('Error creating products table: ', err);
  } else {
    console.log('Products table created successfully');
  }
});

connection.query(createCartTable, (err, results) => {
  if (err) {
    console.error('Error creating cart table: ', err);
  } else {
    console.log('Cart table created successfully');
  }
});


connection.end();
