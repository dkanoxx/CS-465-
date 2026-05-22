const trips = require('../data/trips.json');

const travel = (req, res) => {
    res.render('travel', {
        title: 'Travlr Getaways',
        pageHeader: 'Travel',
        trips
    });
};

module.exports = {
    travel
};