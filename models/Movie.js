const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {type: String, required: true},
    rating: String,
    summary: String,
    genre: String,
});
const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;