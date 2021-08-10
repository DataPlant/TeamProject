const express = require('express');
const router = express.Router();
const db = require('../models/index.js')

router.get('/', (req, res) => {
    res.render('game/game.ejs')
})

router.post('/', (req, res) => {
    console.log(req.body)
    res.redirect('/game');
})


module.exports = router;