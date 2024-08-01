const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');

// GET a list of all the trips
const tripsList = async(req, res) => {
    const q = await Model
        .find({}) // Return all records
        .exec();
        // Uncomment the line below to see query results
        // console.log(q)
    if(!q)                 // Error checks for case of no data returned
    {
        return res
            .status(404)
            .json(err);
    } else {               // Request was successful, returns trip list
        return res
            .status(200)
            .json(q);
    } 
};


// GET a single trip
const tripsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code' : req.params.tripCode}) // Returns a single records
        .exec();
        // Uncomment the line below to see query results
        // console.log(q)
    if(!q)                 // Error checks for case of no data returned
    {
        return res
            .status(404)
            .json(err);
    } else {               // Request was successful, returns trip 
        return res
            .status(200)
            .json(q);
    } 
};

module.exports = {
    tripsList,
    tripsFindByCode
};