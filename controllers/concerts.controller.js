const Concert = require('../models/concerts.model');

exports.getAll = async (req, res) => {

    try {
        res.json(await Concert.find());
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

}


exports.getById = async (req, res) => {

    try {
        const dep = await Concert.findById(req.params.id);
        if (!dep) res.status(404).json({ message: 'Not found' });
        else res.json(dep);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

}

exports.postAll = async (req, res) => {

    try {

        const newConcert = new Concert({
            performer: req.body.performer,
            genre: req.body.genre,
            price: req.body.price,
            day: req.body.day,
            image: req.body.image,
        });
        await newConcert.save();
        res.json({ message: 'OK' });

    } catch (err) {
        res.status(500).json({ message: err });
    }

}

exports.putById = async (req, res) => {

    try {
        await Concert.updateOne({ _id: req.params.id }, {
            $set: {
                performer: req.body.performer,
                genre: req.body.genre,
                price: req.body.price,
                day: req.body.day,
                image: req.body.image,
            }
        });

        const dep = await Concert.findById(req.params.id);
        if (!dep) res.status(404).json({ message: 'Not found' });
        else res.json(dep);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

}

exports.deleteById = async (req, res) => {

    try {
        const dep = await Concert.findById(req.params.id);
        if (dep) {
            await Concert.deleteOne({ _id: req.params.id });

            const dep = await Concert.findById(req.params.id);
            if (!dep) res.status(404).json({ message: 'Not found' });
            else res.json(dep);

        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

}