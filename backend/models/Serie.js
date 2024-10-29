const mongoose = require('mongoose');

const seriesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    director: { type: String},
    seasons: { type: Number },
    releaseDate: { type: Date },
    rating: { type: Number, min: 0, max: 5 },
    status: { type: String, enum: ['Wishlist', 'Watching', 'Completed'], default: 'Wishlist' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Series = mongoose.model('Series', seriesSchema);
module.exports = Series;

