const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const ctrlTrips = require('../controllers/trips');
const ctrlAuth = require('../controllers/authentication');

const auth = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = header.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET || 'travlr_secret');
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

router
  .route('/register')
  .post(ctrlAuth.register);

router
  .route('/login')
  .post(ctrlAuth.login);

router
  .route('/trips')
  .get(ctrlTrips.tripsList)
  .post(auth, ctrlTrips.tripsAddTrip);

router
  .route('/trips/:tripCode')
  .get(ctrlTrips.tripsReadOne)
  .put(auth, ctrlTrips.tripsUpdateOne)
  .delete(auth, ctrlTrips.tripsDeleteOne);

module.exports = router;