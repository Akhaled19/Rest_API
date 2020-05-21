const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');

const {User} = require('../models')

//middleare function to wrap each route in a try catch block 
function asyncHandler(callback) {
    return async(req, res, next) => {
        try {
            await callback(req, res, next)
        } catch (error) {
            res.status(500).json({message: error.message});
            next(error)
        }
    }
} 
//Send a GET request to /api/users to READ(view) currently authenticated user

//Send a POST request to /api/users to CREATE a user 

module.exports = router;