const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: {type: String, required: true},
    console: String,
    summary: String,
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre'
    }
});
const Game = mongoose.model('Game', gameSchema);

module.exports = Game;