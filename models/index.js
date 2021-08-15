const mongoose = require('mongoose');
// const connectionString = 'mongodb://localhost:27017/blogdb';

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${mongoose.connection.host}:${mongoose.connection.port}`);
});

mongoose.connection.on("error", (err) => {
  console.log("Could not connect to MongoDB!", err);
});

module.exports = {
    Game: require('./Game.js'),
    Movie: require('./Movie.js'),
    Music: require('./Music.js'),
    TVShow: require('./TVShow.js'),
    Genre: require('./Genre.js'),
}

