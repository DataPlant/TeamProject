const express = require('express');
const router = express.Router();
const db = require('../models/index.js');

router.get('/', (req, res) => {
    db.Music.find({})
    .populate('genre')
    .exec((err, allMusic) => {
        if(err) return console.log(err);
        res.render('music/music.ejs', {
            allMusic: allMusic
        })
    })
});
router.get('/newMusic', (req, res) =>{
    db.Genre.find({}, (err, allGenre) => {
        if(err) return console.log(err);
        res.render('music/newMusic.ejs', {
            allGenre: allGenre
        })
    })
});
router.post('/newMusic', (req, res) => {
    console.log(req.body);
    let data = {
        title: req.body.title,
        artist: req.body.artist,
        genre: req.body.genre,
        link: req.body.link,
        musiccover: req.body.musiccover,
    };
    db.Music.create(data, (err, createdMusic) => {
        if(err) return console.log(err);
        db.Genre.findByIdAndUpdate(
            createdMusic.genre,
            { $push: {music: createdMusic}},
            (err, updateGenre) => {
                if(err) return console.log(err);
                console.log(updateGenre)
                res.redirect('/music')
            }
        )
    })
});
router.get('/:id', (req, res) => {
    console.log(req.params.id)
    db.Music.findById(req.params.id)
    .populate('genre')
    .exec((err, showMusic) => {
        if(err) return console.log(err);
        res.render('music/showMusic.ejs', {
            showMusic: showMusic
        })
    })
})
router.get('/:id/edit', (req, res) => {
    db.Music.findById(req.params.id, (err, foundMusic) => {
        db.Genre.find({}, (err, allGenre) => {
            if(err) return console.log(err);
            res.render('music/editMusic.ejs', {
                allGenre: allGenre,
                foundMusic: foundMusic
            })
        })
    })
})
router.put('/:id', (req, res) =>{
    db.Music.findByIdAndUpdate(req.params.id, req.body, (err, foundMusic) => {
        if(err) return console.log(err);
        res.redirect(`${req.params.id}`);
    })
})
router.delete('/:id', (req, res) => {
    db.Music.findByIdAndDelete(req.params.id, (err, deletedMusic) => {
        if(err) return console.log(err);
        res.redirect('/music')
    })
})
module.exports = router;