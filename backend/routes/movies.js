const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const authMiddleware = require('../middleware/authMiddleware');

// Add a new movie
router.post('/add', authMiddleware, async (req, res) => {
    try {
        const { title, releaseDate,  rating, category, status} = req.body;

        // Check if a movie with the same title and release date already exists
        const existingMovie = await Movie.findOne({ title, releaseDate });
        if (existingMovie) {
            return res.status(400).json({ error: 'This movie already exists in the library.' });
        }

        // Create a new movie if it's unique
        const newMovie = new Movie({
            title,
            releaseDate,
            rating, 
            status,
            category,  // Save the category
            userId: req.user.userId  // Link the movie to the logged-in user
        });

        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to get a movie by ID
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all movies with filtering, search, pagination, sorting, and user restriction
router.get('/', authMiddleware, async (req, res) => {
    try {
        const { title, status, minRating, maxRating, page = 1, limit = 10, sortBy = 'title' } = req.query;
        const query = { userId: req.user.userId };  // Restrict to the current user's movies

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

        const movies = await Movie.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(pageSize);

        // Total count (for pagination metadata)
        const totalMovies = await Movie.countDocuments(query);
        res.json({
            totalMovies,
            totalPages: Math.ceil(totalMovies / pageSize),
            currentPage: pageNumber,
            movies
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a movie by ID
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        // Find the movie and ensure it belongs to the user
        const updatedMovie = await Movie.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.userId },  // Check that the movie belongs to the user
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedMovie) return res.status(404).json({ error: 'Movie not found' });
        res.json(updatedMovie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a movie by ID
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        // Find the movie and ensure it belongs to the user
        const deletedMovie = await Movie.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
        if (!deletedMovie) return res.status(404).json({ error: 'Movie not found' });
        res.json({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;