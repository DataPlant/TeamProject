const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    genre: {type: String, required: true},
    games: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Game'
        }
    ]
});
const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;