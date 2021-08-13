const mongoose = require('mongoose');

const tvShowSchema = new mongoose.Schema({
    title: {type: String, required: true},
    rating: String,
    genre: String,
    summary: String,
});
const TVShow = mongoose.model('TVShow', tvShowSchema);

module.exports = TVShow;