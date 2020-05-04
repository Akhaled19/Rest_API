const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');

const User = require('../models').User;

//Send a GET request to /api/users to READ(view) currently authenticated user

//Send a POST request to /api/users to CREATE a user 

module.exports = router;