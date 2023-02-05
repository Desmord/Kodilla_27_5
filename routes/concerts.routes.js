const express = require('express');
const router = express.Router();

const ConcertsContriller = require('../controllers/concerts.controller');

router.get('/concerts', ConcertsContriller.getAll);
router.get('/concerts/:id', ConcertsContriller.getById);
router.post('/concerts', ConcertsContriller.postAll);
router.put('/concerts/:id', ConcertsContriller.putById);
router.delete('/concerts/:id', ConcertsContriller.deleteById);

// Kodilla 30.5
router.get('/concerts/performer/:performer', ConcertsContriller.getConcertsByPerformer);
router.get('/concerts/genre/:genre', ConcertsContriller.getConcertsByGenre);
router.get('/concerts/price/:price_min/:price_max', ConcertsContriller.getConcertsByMinAndMaxPrice);
router.get('/concerts/day/:day', ConcertsContriller.getConcertsByDay);




module.exports = router;