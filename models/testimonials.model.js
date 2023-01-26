const mongoose = require('mongoose');

const testimonials = new mongoose.Schema({
    author: { type: String, require: true },
    text: { type: String, require: true },
});

module.exports = mongoose.model('Testimonial', testimonials);