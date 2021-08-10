const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('music/music.ejs')
})

module.exports = router;
