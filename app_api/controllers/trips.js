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

// POST a single trip
const tripsAddTrip = async(req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.start,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    const q = await newTrip.save();

        if(!q)
        { // Database returned no data
            return res
                .status(400)
                .json(err);
        } else { // Return new trip
            return res
                .status(201)
                .json(q);
        }
}

// EDIT a single trip
const tripsUpdateTrip = async(req, res) => {
    const q = await Model
        .findOneAndUpdate(
            { 'code' : req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            }
        )
        .exec();

        if(!q)
        { // Database returned no data
            return res
                .status(400)
                .json(err);
        } else { // Return resulting updated trip
            return res
                .status(201)
                .json(q);
        }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};