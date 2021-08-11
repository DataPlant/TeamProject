const express = require('express');
const router = express.Router();
const db = require('../models/index.js');

router.get('/', (req, res) => {
    db.Music.find({}, (err, allMusic) => {
        if(err) return console.log(err);
        res.render('music/music.ejs', {
            allMusic: allMusic
        })
    })
});
router.get('/newMusic', (req, res) =>{
    res.render('music/newMusic.ejs')
} );
router.post('/newMusic', (req, res) => {
    console.log(req.body);
    let data = {
        title: req.body.title,
        console: req.body.console,
        summary: req.body.summary,
        genre: req.body.genre,
    };
    db.Music.create(data, (err, createdMusic) => {
        if(err) return console.log(err);
        res.redirect('/music')
    })
});
router.get('/:id', (req, res) => {
    console.log(req.params.id)
    db.Music.findById(req.params.id, (err, showMusic) => {
        if(err) return console.log(err);
        res.render('music/showMusic.ejs', {
            showMusic: showMusic
        })
    })
})
router.get('/:id/edit', (req, res) => {
    db.Music.findById(req.params.id, (err, foundMusic) => {
        if(err) return console.log(err);
        res.render('music/editMusic.ejs', {
            foundMusic: foundMusic
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