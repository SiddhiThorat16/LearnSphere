// LearnSphere/backend/app.js

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // database connection module
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

app.use(express.json());

// Register authentication routes
app.use('/auth', authRoutes);


// Example route
app.get('/', (req, res) => {
  res.send("Welcome to LearnSphere backend!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
