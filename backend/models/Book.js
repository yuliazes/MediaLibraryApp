const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    releaseDate: { type: Date },
    rating: { type: Number, min: 0, max: 5 },
    status: { type: String, enum: ['Wishlist', 'Reading', 'Completed'], default: 'Wishlist' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;