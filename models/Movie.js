const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {type: String, required: true},
    rating: String,
    summary: String,
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Genre',
    },
    moviecover: String,
});
const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;