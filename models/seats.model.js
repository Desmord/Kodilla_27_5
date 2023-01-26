const mongoose = require('mongoose');

const seats = new mongoose.Schema({
    day: { type: Number, require: true },
    seat: { type: Number, require: true },
    client: { type: String, require: true },
    emali: { type: String, require: true },
});

module.exports = mongoose.model('Seat', seats);