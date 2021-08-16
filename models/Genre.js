const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    genre: {type: String, required: true},
    games: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Game'
        }
    ],
    movies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie'
        }
    ],
});
const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;