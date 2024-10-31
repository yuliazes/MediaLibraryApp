const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    releaseDate: { type: Date },
    rating: { type: Number, default: 0 },
    status: { type: String, enum: ['Wishlist', 'Reading', 'Completed'], default: 'Wishlist' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: {
        type: String,
        enum: ['Fiction', 'Non-Fiction', 'Mystery', 'Fantasy', 'Science Fiction', 'Romance', 'Historical Fiction', 'Thriller', 'Biography', 'Self-Help', 'Young Adult', 'Children’s', 'Horror', 'Classic', 'Poetry'],  // Enum categories
        required: true  // Ensures a category is always set
    }
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;