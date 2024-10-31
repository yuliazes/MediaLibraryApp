const express = require('express');
const router = express.Router();
const Serie = require('../models/Serie');
const authMiddleware = require('../middleware/authMiddleware');

// Add a new series
router.post('/add', authMiddleware, async (req, res) => {
    try {
        const { title, releaseDate, rating, status } = req.body;

        // Check if a series with the same title and release date already exists
        const existingSerie = await Serie.findOne({ title, releaseDate });
        if (existingSerie) {
            return res.status(400).json({ error: 'This series already exists in the library.' });
        }

        // Create a new series if it's unique
        const newSerie = new Serie({
            title,
            releaseDate,
            description,
            category,  // Save the category
            userId: req.user.userId  // Link the series to the logged-in user
        });

        await newSerie.save();
        res.status(201).json(newSerie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to get a series by ID
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const series = await Serie.findById(req.params.id);
        if (!series) {
            return res.status(404).json({ error: 'Series not found' });
        }
        res.json(series);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all series with filtering, search, pagination, sorting, and user restriction
router.get('/', authMiddleware, async (req, res) => {
    try {
        const { title, status, minRating, maxRating, page = 1, limit = 10, sortBy = 'title' } = req.query;
        const query = { userId: req.user.userId };  // Restrict to the current user's series

        // Filter by title (search)
        if (title) {
            query.title = { $regex: title, $options: 'i' }; // case-insensitive
        }

        // Filter by status
        if (status) {
            query.status = status;
        }

        // Filter by rating range
        if (minRating || maxRating) {
            query.rating = {};
            if (minRating) query.rating.$gte = Number(minRating); // greater than or equal to
            if (maxRating) query.rating.$lte = Number(maxRating); // less than or equal to
        }

        // Pagination
        const pageNumber = parseInt(page);
        const pageSize = parseInt(limit);
        const skip = (pageNumber - 1) * pageSize;

        // Sorting
        const sortOptions = {};
        sortOptions[sortBy] = 1; // Sort by ascending order (use -1 for descending)

        const series = await Serie.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(pageSize);

        // Total count (for pagination metadata)
        const totalSeries = await Serie.countDocuments(query);
        res.json({
            totalSeries,
            totalPages: Math.ceil(totalSeries / pageSize),
            currentPage: pageNumber,
            series
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a series by ID
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        // Find the series and ensure it belongs to the user
        const updatedSerie = await Serie.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.userId },  // Check that the series belongs to the user
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedSerie) return res.status(404).json({ error: 'Series not found' });
        res.json(updatedSerie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a series by ID
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        // Find the series and ensure it belongs to the user
        const deletedSerie = await Serie.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
        if (!deletedSerie) return res.status(404).json({ error: 'Series not found' });
        res.json({ message: 'Series deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;