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
router.get('/newGame', (req, res) =>{
    res.render('game/newGame.ejs')
} );
router.post('/newGame', (req, res) => {
    console.log(req.body);
    let data = {
        title: req.body.title,
        summary: req.body.summary,
    };
    db.Game.create(data, (err, createdGame) => {
        if(err) return console.log(err);
        res.redirect('/game')
    })
});
router.get('/:id', (req, res) => {
    console.log(req.params.id)
    db.Game.findById(req.params.id, (err, showGame) => {
        if(err) return console.log(err);
        res.render('game/showGame.ejs', {
            showGame: showGame
        })
    })
})

module.exports = router;