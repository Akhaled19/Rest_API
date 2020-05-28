const express = require('express');
//creates mini express server
const router = express.Router();

const bcryptjs = require('bcryptjs');
const {User} = require('../models');
const {authenticateUser} = require('../basicAuth');
const {asyncHandler} = require('../scripts');


//Send a GET request to /api/users to READ(view) currently authenticated user
router.get('/users', authenticateUser,asyncHandler(async(req, res) => {
    const user = req.currentUser;
    res.json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress
    });
}));


//Send a POST request to /api/users to CREATE a user 
router.post('/users', asyncHandler(async(req, res) => {
   
    try {
        const user = req.body;
        //if the req body includes a password 
        if(user.password) {
            //hashing & salting the user's pasword before the user is added to the users array
            user.password = bcryptjs.hashSync(user.password, 10);
        }
        //if all the required fields have been submitted, redirect to home & set HTTP status code to 201
        await User.create(user);
        res.status(201).location('/').end();

    } catch (error) {
        //checking for the validations errors 
        if(error.name === "SequelizeValidationError") {
            const errors = error.errors.map(err => {return {
                attribute: err.path,
                message: err.message
            }});
            res.status(400).json(errors);
        //checking for the Unique validations errors        
        } else if(error.name === "SequelizeUniqueConstraintError") {
            const errors = error.errors.map(err => {return {
                attribute: err.path,
                message: err.message
            }});
            res.status(401).json(errors);
        } else {
            throw error
        }
    }
}));

module.exports = router;