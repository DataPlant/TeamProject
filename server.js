const express = require('express');
const app = express();
////Bringing routers in
const gameRoutes = require('./routes/gameRoutes.js');
const musicRoutes = require('./routes/musicRoutes.js');
////
const PORT = 4000;
////

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index.ejs');
});
app.use('/game', gameRoutes);
app.use('/music', musicRoutes);

app.listen(PORT, () => {
    console.log(`Running on localhost:${PORT}`);
  });