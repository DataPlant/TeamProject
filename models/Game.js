const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: {type: String, required: true},
    console: String,
    summary: String,
    genre: String,
});
const Game = mongoose.model('Game', gameSchema);

module.exports = Game;