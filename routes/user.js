const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');

const {User} = require('../models')

//handler function 
function asyncHandler(callback) {
    return async(req, res, next) => {
        try {
            await callback(req, res)
        } catch (error) {
            res.render("error", {error});
        }
    }
} 
//Send a GET request to /api/users to READ(view) currently authenticated user

//Send a POST request to /api/users to CREATE a user 

module.exports = router;