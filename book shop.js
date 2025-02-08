const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json()); // Fix JSON middleware

// Configure MySQL connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "library"
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.log("Error connecting to MySQL:", err);
    }
});



// Get book by ID
app.get("/bookshop/:id", (req, res) => {
    const query = "SELECT * FROM bookshop WHERE shop_id = ?";
    
    connection.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error retrieving the bookshop", details: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Bookshop not found" });
        }
        res.json(results[0]);
    });
});
// Get all cities
app.get("/cities", (req, res) => {
    const query = "SELECT DISTINCT city FROM bookshop"; 
    
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error retrieving the cities", details: err.message });
        }
        res.json(results); 
    });
});

// Get book by name
app.get("/bookshop/name/:name", (req, res) => {
    const query = "SELECT * FROM bookshop WHERE name = ?"; 
    
    connection.query(query, [req.params.name], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error retrieving the bookshop by name", details: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Bookshop not found" });
        }
        res.json(results); 
    });
});
// Get bookshop by email
app.get("/bookshop/email/:email", (req, res) => {
    const query = "SELECT * FROM bookshop WHERE email = ?";
    
    connection.query(query, [req.params.email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error retrieving the bookshop", details: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Bookshop not found" });
        }
        res.json(results[0]);
    });
});

// Update book name by shop_id
app.put("/bookshop/:id", (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }

    const query = "UPDATE bookshop SET name = ? WHERE shop_id = ?";

    connection.query(query, [name, req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error updating bookshop name", details: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Bookshop not found" });
        }
        res.status(200).json({ message: "Bookshop name has been updated" });
    });
});

// Update email of bookshop
app.put("/bookshop/:id/email", (req, res) => {
    const { email } = req.body;
    const query = "UPDATE bookshop SET email = ? WHERE shop_id = ?";

    connection.query(query, [email, req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error updating the bookshop email", details: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Bookshop not found" });
        }
        res.status(200).json({ message: "Bookshop email has been updated" });
    });
});


// Add only one bookshop
app.post("/bookshop/one", (req, res) => {
    const { name, city, email } = req.body;

    if (!name || !city || !email) {
        return res.status(400).json({ error: "Missing required fields (name, city, email)" });
    }

    const query = "INSERT INTO bookshop (name, city, email) VALUES (?, ?, ?)";
    
    connection.query(query, [name, city, email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error adding bookshop", details: err.message });
        }
        res.status(201).json({ message: "Bookshop has been added", shop_id: results.insertId });
    });
});



// Delete one bookshop 
app.delete("/bookshop/:id", (req, res) => {
    const query = "DELETE FROM bookshop WHERE shop_id = ?";

    connection.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error deleting bookshop", details: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Bookshop not found" });
        }
        res.status(200).json({ message: "Bookshop has been deleted" });
    });
});


// Start the server
const port = 3001;
app.listen(port, () => {
    console.log(`Server has been started on http://localhost:${port}`);
});