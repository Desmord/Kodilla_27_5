const express = require('express');
const router = express.Router();

const ConcertsContriller = require('../controllers/concerts.controller');

router.get('/concerts', ConcertsContriller.getAll);
router.get('/concerts/:id', ConcertsContriller.getById);
router.post('/concerts', ConcertsContriller.postAll);
router.put('/concerts/:id', ConcertsContriller.putById);
router.delete('/concerts/:id', ConcertsContriller.deleteById);


module.exports = router;