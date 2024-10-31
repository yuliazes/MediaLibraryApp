const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    director: { type: String},
    releaseDate: { type: Date },
    rating: { type: Number, min: 0, max: 5 },
    status: { type: String, enum: ['Wishlist', 'Watching', 'Completed'], default: 'Wishlist' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: {
        type: String,
        enum:['Action', 'Comedy', 'Drama', 'Horror', 'Science Fiction', 'Fantasy', 'Romance', 'Thriller', 'Mystery', 'Documentary', 'Animation', 'Adventure'],  // Enum categories
        required: true  // Ensures a category is always set
    }
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;