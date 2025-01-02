const mysql = require("mysql");

// Database connection
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "employee_db",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL Database!");

  // Create Employee table
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS employees (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(50),
      last_name VARCHAR(50),
      email VARCHAR(100),
      phone VARCHAR(15),
      department VARCHAR(50),
      joining_date DATE
    )
  `;
  
  db.query(createTableQuery, (err) => {
    if (err) {
      console.error("Error creating employees table:", err);
    } else {
      console.log("Employees table created or already exists.");
    }
  });
});

module.exports = db;
