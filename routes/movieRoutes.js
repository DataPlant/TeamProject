const express = require('express');
const router = express.Router();
const db = require('../models/index.js');

router.get('/', (req, res) => {
    db.Movie.find({})
    .populate('genre')
    .exec((err, allMovie) => {
        if(err) return console.log(err);
        res.render('movie/movie.ejs', {
            allMovie: allMovie
        })
    })
});
router.get('/newMovie', (req, res) =>{
    db.Genre.find({}, (err, allGenre) => {
        if(err) return console.log(err);
        res.render('movie/newMovie.ejs', {
            allGenre: allGenre
        })
    })
});
router.post('/newMovie', (req, res) => {
    console.log(req.body);
    let data = {
        title: req.body.title,
        rating: req.body.rating,
        genre: req.body.genre,
        summary: req.body.summary,
    };
    db.Movie.create(data, (err, createdMovie) => {
        if(err) return console.log(err);
        db.Genre.findByIdAndUpdate(
            createdMovie.genre,
            { $push: {movies: createdMovie}},
            (err, updateGenre) => {
                if(err) return console.log(err);
                console.log(updateGenre)
                res.redirect('/movie')
            }
        )
    })
});
router.get('/:id', (req, res) => {
    console.log(req.params.id)
    db.Movie.findById(req.params.id)
    .populate('genre')
    .exec((err, showMovie) => {
        if(err) return console.log(err);
        res.render('movie/showMovie.ejs', {
            showMovie: showMovie
        })
    })
})
router.get('/:id/edit', (req, res) => {
    db.Movie.findById(req.params.id, (err, foundMovie) => {
        db.Genre.find({}, (err, allGenre) => {
            if(err) return console.log(err);
            res.render('movie/editMovie.ejs', {
                allGenre: allGenre,
                foundMovie: foundMovie,
            })
        })
    })
})
router.put('/:id', (req, res) =>{
    db.Movie.findByIdAndUpdate(req.params.id, req.body, (err, foundMovie) => {
        if(err) return console.log(err);
        res.redirect(`${req.params.id}`);
    })
})
router.delete('/:id', (req, res) => {
    db.Movie.findByIdAndDelete(req.params.id, (err, deletedMovie) => {
        if(err) return console.log(err);
        res.redirect('/movie')
    })
})
module.exports = router;