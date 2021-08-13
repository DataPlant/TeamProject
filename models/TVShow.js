const mongoose = require('mongoose');

const tvShowSchema = new mongoose.Schema({
    title: {type: String, required: true},
    artist: String,
    genre: String,
    link: String,
});
const TVShow = mongoose.model('TVShow', tvShowSchema);

module.exports = TVShow;