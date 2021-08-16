const express = require('express');
const router = express.Router();
const db = require('../models/index.js');

router.get('/', (req, res) => {
    db.Genre.find({}, (err, allGenre) => {
        if(err) return console.log(err);
        res.render('genre/genre.ejs', {
            allGenre: allGenre
        })
    })
});
router.get('/newGenre', (req, res) =>{
    res.render('genre/newGenre.ejs')
})
router.get('/:id', (req, res) => {
    console.log(req.params.id)
    db.Genre.findById(req.params.id)
    .populate('games')
    .populate('movies')
    .exec((err, foundGenre) => {
        if (err) return console.log(err);
        res.render('genre/showGenre.ejs', {
            genre: foundGenre
        })
    })
})
router.post('/', (req, res) => {
    db.Genre.create(req.body, (err, createdGenre) => {
        if(err) return console.log(err);
        res.redirect('/genre')
    })
});
router.delete('/:id', (req, res) => {
    db.Genre.findByIdAndDelete(req.params.id, (err) => {
        if(err) return console.log(err);
        res.redirect('/genre')
    })
})
module.exports = router;