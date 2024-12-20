const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables
const authRoutes = require('./routes/auth'); 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());  // JSON parsing middleware should come before routes

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('MongoDB connection error:', error));

// Authentication Routes
app.use('/api/auth', authRoutes);  // Ensure this line is present and correct

// Import Routes
const bookRoutes = require('./routes/books');
console.log('Book routes loaded');
const movieRoutes = require('./routes/movies');
console.log('Movie routes loaded');
const seriesRoutes = require('./routes/series');
console.log('Series routes loaded');

// Register Routes
app.use('/api/books', bookRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/series', seriesRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});