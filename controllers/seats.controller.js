const Seat = require('../models/seats.model');
const sanitize = require('mongo-sanitize');


const seatsUpdated = (io, seats) => {
    io.local.emit('seatsUpdated', seats);
}


exports.getAll = async (req, res) => {
    try {
        res.json(await Seat.find());
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
}


exports.getById = async (req, res) => {

    try {
        const dep = await Seat.findById(sanitize(req.params.id));
        if (!dep) res.status(404).json({ message: 'Not found' });
        else res.json(dep);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

}

exports.postAll = async (req, res) => {


    try {
        const dbData = await Seat.find();
        const isTaken = dbData.some(seat => {
            if (`${seat.day}` === `${req.body.day}` && `${seat.seat}` === `${req.body.seat}`) {
                return true
            } else {
                return false
            }
        })

        if (isTaken) {
            res.status(409).send({ message: "The slot is already taken..." });
        } else {


            try {

                const newSeat = new Seat({
                    id: sanitize(req.body.id),
                    day: sanitize(req.body.day),
                    seat: sanitize(req.body.seat),
                    client: sanitize(req.body.client),
                    email: sanitize(req.body.email)
                });
                await newSeat.save();
                res.json({ message: 'OK' });

            } catch (err) {
                res.status(500).json({ message: err });
            }
            seatsUpdated(req.io, DB.seats)
        }

    }
    catch (err) {
        res.status(500).json({ message: err });
    }


}

exports.putById = async (req, res) => {

    try {
        await Seat.updateOne({ _id: sanitize(req.params.id) }, {
            $set: {
                id: sanitize(req.body.id),
                day: sanitize(req.body.day),
                seat: sanitize(req.body.seat),
                client: sanitize(req.body.client),
                email: sanitize(req.body.email)
            }
        });

        const dep = await Seat.findById(sanitize(req.params.id));
        if (!dep) res.status(404).json({ message: 'Not found' });
        else res.json(dep);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

}

exports.deleteById = async (req, res) => {

    try {
        const dep = await Seat.findById(sanitize(req.params.id));
        if (dep) {
            await Seat.deleteOne({ _id: sanitize(req.params.id) });

            const dep = await Seat.findById(sanitize(req.params.id));
            if (!dep) res.status(404).json({ message: 'Not found' });
            else res.json(dep);

        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

}