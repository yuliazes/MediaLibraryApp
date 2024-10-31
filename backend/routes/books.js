const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add', authMiddleware, async (req, res) => {
    try {
        const { title, author, releaseDate, rating, category, status } = req.body;

        // Check if a book with the same title and author already exists
        const existingBook = await Book.findOne({ title, author });
        if (existingBook) {
            return res.status(400).json({ error: 'This book already exists in the library.' });
        }

        // Create a new book if it's unique
        const newBook = new Book({
            title,
            author,
            releaseDate,
            rating,
            status,
            category,  // Save the category
            userId: req.user.userId  // Link the book to the logged-in user
        });

        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Route to get a book by ID
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Get all books with filtering, search, pagination, sorting, and user restriction
router.get('/', authMiddleware, async (req, res) => {
    try {
        const { title, author, status, minRating, maxRating, page = 1, limit = 10, sortBy = 'title' } = req.query;
        const query = { userId: req.user.userId };  // Restrict to the current user's books

        // Filter by title (search)
        if (title) {
            query.title = { $regex: title, $options: 'i' }; // case-insensitive
        }

        // Filter by author (search)
        if (author) {
            query.author = { $regex: author, $options: 'i' };
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

        const books = await Book.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(pageSize);

        // Total count (for pagination metadata)
        const totalBooks = await Book.countDocuments(query);
        res.json({
            totalBooks,
            totalPages: Math.ceil(totalBooks / pageSize),
            currentPage: pageNumber,
            books
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a book by ID
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        // Find the book and ensure it belongs to the user
        const updatedBook = await Book.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.userId },  // Check that the book belongs to the user
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedBook) return res.status(404).json({ error: 'Book not found' });
        res.json(updatedBook);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a book by ID
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        // Find the book and ensure it belongs to the user
        const deletedBook = await Book.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
        if (!deletedBook) return res.status(404).json({ error: 'Book not found' });
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;