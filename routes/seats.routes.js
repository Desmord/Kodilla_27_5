const express = require('express');
const router = express.Router();

const SeatsController = require('../controllers/concerts.controller');

router.get('/seats', SeatsController.getAll);
router.get('/seats/:id', SeatsController.getById);
router.post('/seats', SeatsController.postAll);
router.put('/seats/:id', SeatsController.putById);
router.delete('/seats/:id', SeatsController.deleteById);





module.exports = router;