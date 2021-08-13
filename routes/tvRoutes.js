const express = require('express');
const router = express.Router();
const db = require('../models/index.js');

router.get('/', (req, res) => {
    db.TVShow.find({}, (err, allTV) => {
        if(err) return console.log(err);
        res.render('tv-show/tv-show.ejs', {
            allTV: allTV
        })
    })
});
router.get('/newTV', (req, res) =>{
    res.render('tv-show/newTV.ejs')
} );
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
        res.redirect('/tv-show')
    })
});
router.get('/:id', (req, res) => {
    console.log(req.params.id)
    db.TVShow.findById(req.params.id, (err, showTV) => {
        if(err) return console.log(err);
        res.render('tv-show/showTV.ejs', {
            showTV: showTV
        })
    })
})
router.get('/:id/edit', (req, res) => {
    db.TVShow.findById(req.params.id, (err, foundTV) => {
        if(err) return console.log(err);
        res.render('tv-show/editTV.ejs', {
            foundTV: foundTV
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