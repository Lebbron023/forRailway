const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors'); // Import the cors package

const app = express();

// MySQL connection configuration
const db = mysql.createConnection({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12759668',
    password: 'Z97NPkazMl',
    database: 'sql12759668'
});

// Connect to MySQL database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to MySQL database!');
});



// ROUTE FOR ACCOUNTS
app.get('/accounts', (req, res) => {
    // Query to fetch all rows from the 'accounts' table
    db.query('SELECT * FROM accounts', (err, rows) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        // Send the retrieved rows as a JSON response
        res.json({ success: true, data: rows });
    });
});


// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });