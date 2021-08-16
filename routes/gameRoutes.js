const express = require('express');
const router = express.Router();
const db = require('../models/index.js');

router.get('/', (req, res) => {
    db.Game.find({})
    .populate('genre')
    .exec((err, allGame) => {
        if(err) return console.log(err);
        res.render('game/game.ejs', {
            allGame: allGame
        })
    })
});
router.get('/newGame', (req, res) =>{
    db.Genre.find({}, (err, allGenre) => {
        if(err) return console.log(err);
        res.render('game/newGame.ejs', {
            allGenre: allGenre
        })
    })
})
router.post('/newGame', (req, res) => {
    console.log(req.body);
    let data = {
        title: req.body.title,
        console: req.body.console,
        summary: req.body.summary,
        genre: req.body.genre,
        gamecover: req.body.gamecover,
    };
    db.Game.create(data, (err, createdGame) => {
        if(err) return console.log(err);
        db.Genre.findByIdAndUpdate(
            createdGame.genre,
            { $push: {games: createdGame}},
            (err, updateGenre) => {
                if(err) return console.log(err);
                console.log(updateGenre)
                res.redirect('/game')
            }
        )
    })
});
router.get('/:id', (req, res) => {
    console.log(req.params.id)
    db.Game.findById(req.params.id)
    .populate('genre')
    .exec((err, showGame) => {
        if(err) return console.log(err);
        res.render('game/showGame.ejs', {
            showGame: showGame
        })
    })
})
router.get('/:id/edit', (req, res) => {
    db.Game.findById(req.params.id, (err, foundGame) => {
        db.Genre.find({}, (err, allGenre) => {
            if(err) return console.log(err);
            res.render('game/editGame.ejs', {
                allGenre: allGenre,
                foundGame: foundGame
            })
        })
        // if(err) return console.log(err);
        // res.render('game/editGame.ejs', {
        //     foundGame: foundGame
        // })
    })
})
router.put('/:id', (req, res) =>{
    db.Game.findByIdAndUpdate(req.params.id, req.body, (err, foundGame) => {
        if(err) return console.log(err);
        res.redirect(`${req.params.id}`);
    })
})
router.delete('/:id', (req, res) => {
    db.Game.findByIdAndDelete(req.params.id, (err, deletedGame) => {
        if(err) return console.log(err);
        res.redirect('/game')
    })
})
module.exports = router;