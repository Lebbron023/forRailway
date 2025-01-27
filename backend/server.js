const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors'); // Import the cors package

const app = express();



// Enable CORS for all origins (or customize it)
app.use(cors());

// Now your backend will accept requests from different origins
app.use(express.json());  // Middleware to parse JSON bodies

// MySQL connection configuration
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'mpf_db'
// });

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

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret';

// Middleware
app.use(bodyParser.json()); // For parsing application/json

// Fetch all accounts
app.get('/accounts', (req, res) => {
    db.query('SELECT * FROM accounts', (err, rows) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(rows);
    });
});


// Login route
app.post('/login', (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Query the 'accounts' table for the user with the given email
      db.query('SELECT * FROM accounts WHERE email = ?', [email], (err, results) => {
        if (err) {
          console.error('Database query error:', err);
          return res.status(500).json({ message: 'Internal Server Error' });
        }
  
        // If no user is found, return an error
        if (results.length === 0) {
          return res.status(400).json({ message: 'User not found' });
        }
  
        const account = results[0]; // The first result (there should only be one)
        
        // Compare the password with the stored hash
        bcrypt.compare(password, account.password, (err, result) => {
          if (err || !result) {
            return res.status(400).json({ message: 'Invalid credentials' });
          }
  
          // Create JWT token
          const token = jwt.sign({ id: account.id, email: account.email }, 'JWT_SECRET', {
            expiresIn: '1h',
          });
  
          res.json({ token });
        });
      });
    } catch (error) {
      console.error('Error during login process:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });



// Register Route
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error hashing password' });
        }

        // SQL query to insert the new account with hashed password
        const sql = 'INSERT INTO accounts (name, email, password) VALUES (?, ?, ?)';
        db.query(sql, [name, email, hashedPassword], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ success: false, message: 'Database error' });
            }

            // Send a success response
            res.status(201).json({ success: true, message: 'Account created successfully' });
        });
    });
});

// Protected route
app.get('/api/protected', (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.json({ success: true, message: 'Access granted', userId: decoded.userId });
    } catch (err) {
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
});



// Define a root route
app.get('/', (req, res) => {
    res.send('Hello from Express!');
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
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });