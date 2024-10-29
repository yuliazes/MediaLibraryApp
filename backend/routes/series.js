const express = require('express');
const router = express.Router();
const Serie = require('../models/Serie');
const authMiddleware = require('../middleware/authMiddleware');


// Add a new serie
router.post('/add', authMiddleware, async (req, res) => {
    try {
        const newSerie = new Serie({
            ...req.body,
            userId: req.user.userId  // Associate the series with the logged-in user
        });
        await newSerie.save();
        res.status(201).json(newSerie);
    } catch (error) {
        res.status(400).json({ error: error.message });
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

// Update a serie by ID
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        // Find the series and ensure it belongs to the user
        const updatedSerie = await Serie.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.userId },  // Check that the series belongs to the user
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedSerie) return res.status(404).json({ error: 'Serie not found' });
        res.json(updatedSerie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a serie by ID
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        // Find the series and ensure it belongs to the user
        const deletedSerie = await Serie.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
        if (!deletedSerie) return res.status(404).json({ error: 'Serie not found' });
        res.json({ message: 'Serie deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;