const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');

router
  .route('/trips')
  .get(tripsController.tripsList)      // GET all
  .post(tripsController.tripsAddTrip); // POST new

router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)   // GET one
  .put(tripsController.tripsUpdateTrip)   // PUT update
  .delete(tripsController.tripsDeleteTrip); // DELETE

module.exports = router;