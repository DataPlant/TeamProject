const mongoose = require('mongoose');

const genreSchema = {
    Horror: [],
    Action: [],
};
const Genre = mongoose.model('Movie', genreSchema);

module.exports = Genre;