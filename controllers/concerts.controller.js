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


// Kodilla 30.5

// Sprawdzanie czy puste jeśli nie podano argumentu???
exports.getConcertsByPerformer = async (req, res) => {

    try {

        const performer = req.params.performer;
        let concerts = await Concert.find()

        concerts = concerts.filter(concert => concert.performer.toLowerCase() === performer.toLowerCase() ? true : false);

        if (!concerts.length) {
            res.status(500).json({ message: `Not found` })
        } else {
            res.json(concerts);
        }

    }
    catch (err) {
        res.status(500).json({ message: `Error` });
    }

}

exports.getConcertsByGenre = async (req, res) => {

    try {

        const genre = req.params.genre;
        let concerts = await Concert.find()

        concerts = concerts.filter(concert => concert.genre.toLowerCase() === genre.toLowerCase() ? true : false);

        if (!concerts.length) {
            res.status(500).json({ message: `Not found` })
        } else {
            res.json(concerts);
        }

    }
    catch (err) {
        res.status(500).json({ message: `Error` });
    }

}

exports.getConcertsByMinAndMaxPrice = async (req, res) => {

    try {

        const min = req.params.price_min;
        const max = req.params.price_max;
        let concerts = await Concert.find()

        concerts = concerts.filter(concert => concert.price <= max ? true : false);
        concerts = concerts.filter(concert => concert.price >= min ? true : false);

        if (!concerts.length) {
            res.status(500).json({ message: `Not found` })
        } else {
            res.json(concerts);
        }

    }
    catch (err) {
        res.status(500).json({ message: `Error` });
    }

}

exports.getConcertsByDay = async (req, res) => {

    try {

        const day = req.params.day;
        let concerts = await Concert.find()
        // console.log(`ehej`)
        // console.log(day)
        // console.log(concerts)
        concerts = concerts.filter(concert => concert.day === parseInt(day) ? true : false);

        

        if (!concerts.length) {
            res.status(500).json({ message: `Not found` })
        } else {
            res.json(concerts);
        }

    }
    catch (err) {
        res.status(500).json({ message: `Error` });
    }

}