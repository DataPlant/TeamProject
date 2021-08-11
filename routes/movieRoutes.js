const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('movie/movie.ejs')
})

module.exports = router;
