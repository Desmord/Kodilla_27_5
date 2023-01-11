const express = require('express');
const router = express.Router();
const DB = require('../db');


router.get('/concerts', (req, res) => {
    res.json(DB.concerts);
});

router.get('/concerts/:id', (req, res) => {
    const searchEntrie = DB.concerts.filter(entrie => `${entrie.id}` === req.params.id ? true : false)[0];

    if (searchEntrie) {
        res.json(searchEntrie);
    } else {
        res.json({ message: `ERROR` });
    }
});

router.post('/concerts', (req, res) => {

    DB.concerts.push({
        performer: req.body.performer,
        genre: req.body.genre,
        price: req.body.price,
        day: req.body.day,
        image: req.body.image,
        id: uuidv4(),
    })
    res.json({ message: `OK` });
});

router.put('/concerts/:id', (req, res) => {
    DB.concerts = DB.concerts.map(entrie => `${entrie.id}` === `${req.params.id}` ? {
        ...entrie,
        performer: req.body.performer,
        genre: req.body.genre,
        price: req.body.price,
        day: req.body.day,
        image: req.body.image,
    } : entrie)

    res.json({ message: `OK` });
});

router.delete('/concerts/:id', (req, res) => {
    DB.concerts = DB.concerts.filter(entrie => `${entrie.id}` === `${req.params.id}` ? false : true);

    res.json({ message: `OK` });
});


module.exports = router;