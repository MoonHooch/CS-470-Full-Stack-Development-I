const express = require('express');
const router = express.Router();

// Import the controllers to route
const tripsController = require('../controllers/trips');

// Define route for the trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList) // GET method routes tripsList
    .post(tripsController.tripsAddTrip); // POST Method Adds a Trip
    

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode) // GET method routes
    .put(tripsController.tripsUpdateTrip);
    
module.exports = router;