// LearnSphere/backend/app.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Enable CORS BEFORE routes
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());

// Register routes AFTER CORS middleware
app.use('/auth', authRoutes);
app.use('/courses', courseRoutes);

// Example route
app.get('/', (req, res) => {
  res.send("Welcome to LearnSphere backend!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
