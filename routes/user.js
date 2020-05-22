const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');

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

//Authentication Middleware to wrap eeach route that needs to be protected 
const authenticateUser = (req, res, next) => {
    let message;

    //parse the user's credentials from the authorization header 
    const credentials = auth(req);
    //if user's credentials are available...
    if(credentials) {
        //retrieve username from the db
        const user = User.findOne({ where: { emailAddress: credentials.name}});

         //if a user was succesfully found
        if(user) {
            //using compareSync bcryptjs method to compare the hashed password with the credential pass
            const authenticated = bcryptjs
                .compareSync(credentials.pass, user.password);
            
            //if the password match...    
            if(authenticated) {
                //add the user account to the request object
                req.currentUser = user
            } else {
                message = `Authentication failure for email address: ${user.emailAddress}`;
            }   
        } else {
            message = `Authentication failure for email address: ${credentials.name}`;
        }
    } else {
        message = 'Auth header not found';
    }
    //if user authentication failed...
    if(message) {
        console.warn(message);
        //return a response with a 401 HTTP status code
        res.status(401).json({message: 'Acess Denied'});
    //or if user authenication succeeded...    
    } else {
        next();
    }
}

//Send a GET request to /api/users to READ(view) currently authenticated user
router.get('/users', authenticateUser,asyncHandler(async(req, res) => {
    const user = req.currentUser;
    res.json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
    });
}));


//Send a POST request to /api/users to CREATE a user 
router.post('/users', asyncHandler(async(req, res) => {
   
    try {
        const user = req.body;

        if(user.password) {
            //hashing the user's pasword before the user is added to the users array
            user.password = bcryptjs.hashSync(user.password);
        }
        //if all the required fields have been submitted, redirect to home & set HTTP status code to 201
        await User.create(user);
        res.status(201).location('/').end();

    } catch (error) {
        //checking the errors 
        if(error.name === "SequelizeValidationError") {
            const errors = error.errors.map(err => {return {
                attribute: err.path,
                message: err.message
            }});
            res.status(400).json(errors);
                
        } else if(errors.name === "SequelizeUniqueConstraintError") {
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