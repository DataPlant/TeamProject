const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('tv-show/tv-show.ejs')
})

module.exports = router;