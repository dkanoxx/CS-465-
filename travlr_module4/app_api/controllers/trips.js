const mongoose = require('mongoose');
const Trip = mongoose.model('Trip');

const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({}).sort({ code: 1 }).lean();
        res.status(200).json(trips);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving trips', error: err.message });
    }
};

const tripsReadOne = async (req, res) => {
    try {
        const trip = await Trip.findOne({ code: req.params.tripCode }).lean();
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        res.status(200).json(trip);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving trip', error: err.message });
    }
};

module.exports = {
    tripsList,
    tripsReadOne
};
