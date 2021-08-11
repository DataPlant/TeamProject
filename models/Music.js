const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
    title: {type: String, required: true},
    console: String,
    summary: String,
    genre: String,
});
const Music = mongoose.model('Music', musicSchema);

module.exports = Music;