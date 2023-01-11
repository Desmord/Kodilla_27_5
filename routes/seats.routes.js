const express = require('express');
const router = express.Router();
const DB = require('../db');


router.get('/seats', (req, res) => {
    res.json(DB.seats);
});

router.get('/seats/:id', (req, res) => {
    const searchEntrie = DB.seats.filter(entrie => `${entrie.id}` === req.params.id ? true : false)[0];

    if (searchEntrie) {
        res.json(searchEntrie);
    } else {
        res.json({ message: `ERROR` });
    }
});

router.post('/seats', (req, res) => {

    DB.seats.push({
        seat: req.body.seat,
        client: req.body.client,
        email: req.body.email,
        day: req.body.day,
        id: uuidv4(),
    })
    res.json({ message: `OK` });
});

router.put('/seats/:id', (req, res) => {
    DB.seats = DB.seats.map(entrie => `${entrie.id}` === `${req.params.id}` ? {
        ...entrie,
        seat: req.body.seat,
        client: req.body.client,
        email: req.body.email,
        day: req.body.day,
    } : entrie)

    res.json({ message: `OK` });
});

router.delete('/seats/:id', (req, res) => {
    DB.seats = DB.seats.filter(entrie => `${entrie.id}` === `${req.params.id}` ? false : true);

    res.json({ message: `OK` });
});





module.exports = router;