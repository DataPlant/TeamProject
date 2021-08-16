const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
    title: {type: String, required: true},
    artist: String,
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Genre',
    },
    link: String,
});
const Music = mongoose.model('Music', musicSchema);

module.exports = Music;