require('dotenv').config()
const express = require('express');
const app = express();
const methodOverride = require('method-override');
////Bringing routers in
const gameRoutes = require('./routes/gameRoutes.js');
const musicRoutes = require('./routes/musicRoutes.js');
const movieRoutes = require('./routes/movieRoutes.js');
const tvRoutes = require('./routes/tvRoutes.js')
////
const PORT = 4000;
////
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index.ejs');
});
app.use('/game', gameRoutes);
app.use('/music', musicRoutes);
app.use('/movie', movieRoutes);
app.use('/tv-show', tvRoutes);

app.listen(process.env.PORT || 4000, () => {
    console.log(`Running on localhost:${PORT}`);
  });