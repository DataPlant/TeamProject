const mongoose = require('mongoose');

const tvShowSchema = new mongoose.Schema({
    title: {type: String, required: true},
    rating: String,
    summary: String,
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Genre',
    },
});
const TVShow = mongoose.model('TVShow', tvShowSchema);

module.exports = TVShow;