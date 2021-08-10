const express = require('express');
const router = express.Router();
const db = require('../models/index.js');

router.get('/', (req, res) => {
    db.Game.find({}, (err, allGame) => {
        if(err) return console.log(err);
        res.render('game/game.ejs', {
            allGame: allGame
        })
    })
});

router.post('/', (req, res) => {
    console.log(req.body);
    let data = {
        title: req.body.title,
        summary: req.body.summary,
    };
    db.Game.create(data, (err, createdGame) => {
        if(err) return console.log(err);
        res.redirect('/game')
    })
    // res.redirect('/game');
});
// router.get('/:id', (req, res) => {
//     console.log(req.params.id)
    

// })

module.exports = router;