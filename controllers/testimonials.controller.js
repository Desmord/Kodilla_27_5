const Testimonial = require('../models/testimonials.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
    try {
        res.json(await Testimonial.find());
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
}


exports.getRandom = async (req, res) => {

    try {
        const count = await Testimonial.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const dep = await Testimonial.findOne().skip(rand);
        if (!dep) res.status(404).json({ message: 'Not found' });
        else res.json(dep);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

}

exports.getById = async (req, res) => {

    try {
        const cleanId = sanitize(req.params.id)
        const dep = await Testimonial.findById(cleanId);

        if (!dep)
            res.status(404).json({ message: 'Not found' });
        else
            res.json(dep);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

}

exports.postAll = async (req, res) => {
    try {

        const newTestimonial = new Testimonial({
            author: sanitize(req.body.author),
            text: sanitize(req.body.text)
        });
        await newTestimonial.save();
        res.json({ message: 'OK' });

    } catch (err) {
        res.status(500).json({ message: err });
    }
}

exports.putById = async (req, res) => {
    try {
        await Testimonial.updateOne({ _id: sanitize(req.params.id) }, {
            $set: {
                author: sanitize(req.body.author),
                text: sanitize(req.body.text)
            }
        });

        const dep = await Testimonial.findById(sanitize(req.params.id));
        if (!dep) res.status(404).json({ message: 'Not found' });
        else res.json(dep);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

}

exports.deleteById = async (req, res) => {
    try {
        const dep = await Testimonial.findById(sanitize(req.params.id));
        if (dep) {
            await Testimonial.deleteOne({ _id: sanitize(req.params.id) });

            const dep = await Testimonial.findById(sanitize(req.params.id));
            if (!dep) res.status(404).json({ message: 'Not found' });
            else res.json(dep);

        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
}