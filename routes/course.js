const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');

//const {Course, User} = require('../models');
const {Course, User} = require('../models')

//middleare function to wrap each route in a try catch block 
function asyncHandler(callback) {
    return async(req, res, next) => {
        try {
            await callback(req, res, next)
        } catch (error) {
            // res.render("error", {error:error});
            // console.log(error);
            next(error)
        }
   }
}

//Send a GET request to /api/courses READ(view) a list of courses (including the user that owns each course)  
router.get('/courses', asyncHandler(async(req, res) => {
    const courses = await Course.findAll();
    res.json(courses);
}))


//Send a GET request to /api/courses/:id READ(view) a course (including the user that owns it)
router.get('/courses/:id', asyncHandler(async(req, res) => {
    const course = await Course.findByPk(req.params.id)
    res.json(course);
}));

//Send a POST request to /api/courses CREATE a course 
router.post('/courses', asyncHandler(async(req, res) => {  
    const course = await Course.create({
        title: req.body.title,
        description: req.body.description,
        estimatedTime: req.body.estimatedTime,
        materialsNeeded: req.body.materialsNeeded,
        userId: req.body.userId
    });
    res.json(course);
}));

//Send a PUT request to /api/courses/:id UPDATE(edit) a course 
router.put('/courses/:id', asyncHandler(async(req, res, next) => {
    const course = await Course.findByPk(req.params.id);
}));

//Send a DELETE request to /api/courses/:id DELETE a course
router.delete('/courses/:id', asyncHandler(async(req, res, next)=> {
    const course = await Course.findByPk(req.params.id);
}));

module.exports = router;