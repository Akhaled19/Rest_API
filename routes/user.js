const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const bcryptjs = require('bcryptjs');

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
router.get('/users', asyncHandler(async(req, res) => {
    const user = await User.findByPk();
}));


//Send a POST request to /api/users to CREATE a user 
router.post('/users', asyncHandler(async(req, res) => {
    let user;
    try {
        //if all the required fields have been submitted, redirect to home & set HTTP status code to 201
        user = await User.create(req.body);
        //hashing the user's pasword before the user is added to the users array
        user.password = bcryptjs.hashSync(user.password);
        res.status(201).location('/api/users').end();

    } catch (error) {
        //checking the errors 
        if(error.name === "SequelizeValidationError") {
            const errors = error.errors.map(err => {return {
                attribute: err.path,
                message: err.message
            }});
            //display simplified error messages and set HTTP status code to 400 
            res.status(400).json(errors)

         //error caught in the asynchandler's catch block     
        } else {throw error}
    }
}));

module.exports = router;