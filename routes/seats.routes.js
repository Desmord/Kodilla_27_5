const express = require('express');
const router = express.Router();
const DB = require('../db');
const { v4: uuidv4 } = require('uuid');


const seatsUpdated = (io, seats) => {
    io.local.emit('seatsUpdated',seats);
}


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

    const isTaken = DB.seats.some(seat => {
        if (`${seat.day}` === `${req.body.day}` && `${seat.seat}` === `${req.body.seat}`) {
            return true
        } else {
            return false
        }
    })

    if (isTaken) {
        res.status(409).send({ message: "The slot is already taken..." });
    } else {

        DB.seats.push({
            seat: req.body.seat,
            client: req.body.client,
            email: req.body.email,
            day: req.body.day,
            id: uuidv4(),
        })

        res.json({ message: `OK` });
        seatsUpdated(req.io, DB.seats)
    }

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