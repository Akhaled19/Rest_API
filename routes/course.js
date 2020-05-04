const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');

const Course = require('../models').Course;

//Send a GET request to /api/courses READ(view) a list of courses (including the user that owns each course)  
router.get('/courses', (req, res) => {
    res.json({greeting: "hello world"});
});

//Send a GET request to /api/courses/:id READ(view) a course (including the user that owns it)

//Send a POST request to /api/courses CREATE a course 

//Send a PUT request to /api/courses/:id UPDATE(edit) a course 

//Send a DELETE request to /api/courses/:id DELETE a course

module.exports = router;