const express = require('express');
const router = express.Router();
const DB = require('../db');

router.get('/testimonials', (req, res) => {
    res.json(DB.testimonials);
});

router.get('/testimonials/random', (req, res) => {
    const randomEntrie = DB.testimonials[Math.floor(Math.random() * (DB.length - 0) + 0)]

    if (randomEntrie) {
        res.json(randomEntrie);
    } else {
        res.json({ message: `ERROR` });
    }

});

router.get('/testimonials/:id', (req, res) => {
    const searchEntrie = DB.testimonials.filter(entrie => `${entrie.id}` === req.params.id ? true : false)[0];

    if (searchEntrie) {
        res.json(searchEntrie);
    } else {
        res.json({ message: `ERROR` });
    }
});


router.post('/testimonials', (req, res) => {

    DB.testimonials.push({
        author: req.body.author,
        text: req.body.text,
        id: uuidv4(),
    })
    res.json({ message: `OK` });
});

router.put('/testimonials/:id', (req, res) => {
    DB.testimonials = DB.testimonials.map(entrie => `${entrie.id}` === `${req.params.id}` ? {
        ...entrie,
        author: req.params.author,
        text: req.params.text
    } : entrie)

    res.json({ message: `OK` });
});

router.delete('/testimonials/:id', (req, res) => {
    DB.testimonials = DB.testimonials.filter(entrie => `${entrie.id}` === `${req.params.id}` ? false : true);

    res.json({ message: `OK` });
});


module.exports = router;