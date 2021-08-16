const express = require('express');
const router = express.Router();
const db = require('../models/index.js');

router.get('/', (req, res) => {
    db.TVShow.find({})
    .populate('genre')
    .exec((err, allTV) => {
        if(err) return console.log(err);
        res.render('tv-show/tv-show.ejs', {
            allTV: allTV
        })
    })
});
router.get('/newTV', (req, res) =>{
    db.Genre.find({}, (err, allGenre) => {
        if(err) return console.log(err);
        res.render('tv-show/newTV.ejs', {
            allGenre: allGenre
        })
    })
});
router.post('/newTV', (req, res) => {
    console.log(req.body);
    let data = {
        title: req.body.title,
        rating: req.body.rating,
        summary: req.body.summary,
        genre: req.body.genre,
    };
    db.TVShow.create(data, (err, createdTV) => {
        if(err) return console.log(err);
        db.Genre.findByIdAndUpdate(
            createdTV.genre,
            { $push: {tvshows: createdTV}},
            (err, updateGenre) => {
                if(err) return console.log(err);
                console.log(updateGenre)
                res.redirect('/tv-show')
            }
        )
    })
});
router.get('/:id', (req, res) => {
    console.log(req.params.id)
    db.TVShow.findById(req.params.id)
    .populate('genre')
    .exec((err, showTV) => {
        if(err) return console.log(err);
        res.render('tv-show/showTV.ejs', {
            showTV: showTV
        })
    })
})
router.get('/:id/edit', (req, res) => {
    db.TVShow.findById(req.params.id, (err, foundTV) => {
        db.Genre.find({}, (err, allGenre) => {
            if(err) return console.log(err);
            res.render('tv-show/editTV.ejs', {
                allGenre: allGenre,
                foundTV: foundTV
            })
        })
    })
})
router.put('/:id', (req, res) =>{
    db.TVShow.findByIdAndUpdate(req.params.id, req.body, (err, foundTV) => {
        if(err) return console.log(err);
        res.redirect(`${req.params.id}`);
    })
})
router.delete('/:id', (req, res) => {
    db.TVShow.findByIdAndDelete(req.params.id, (err, deletedTV) => {
        if(err) return console.log(err);
        res.redirect('/tv-show')
    })
})
module.exports = router;