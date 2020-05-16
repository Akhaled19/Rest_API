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
            next(error)
        }
   }
}


//Send a GET request to /api/courses READ(view) a list of courses (including the user that owns each course)  
router.get('/courses', asyncHandler(async(req, res) => {
    const courses = await Course.findAll({
        //select only some attributes
        attributes: {
            exclude: [
                "createdAt",
                "updatedAt"
            ]
        },   
        include: [
            {
                model: User,
                as: 'userInfo',
            },
        ]
    });
    res.json(courses);
}))


//Send a GET request to /api/courses/:id READ(view) a course (including the user that owns it)
router.get('/courses/:id', asyncHandler(async(req, res) => {
    const course = await Course.findByPk(req.params.id, {
        attributes: {
            exclude: [
                "createdAt",
                "updatedAt" 
            ]
        },
        include: [
            {
                model: User,
                as: 'userInfo'
            },
        ]
    });
    if(course) {res.json(course)}
    else {res.status(404).json({message: "Course not found."})};
    
}));


//Send a POST request to /api/courses CREATE a course 
router.post('/courses', asyncHandler(async(req, res, next) => { 
    //if all the required fields have been submitted, set HTTP status code to 201 
    if(req.body.title && req.body.description && req.body.estimatedTime && req.body.materialsNeeded && req.body.userId) {
        const course = await Course.create({
            title: req.body.title,
            description: req.body.description,
            estimatedTime: req.body.estimatedTime,
            materialsNeeded: req.body.materialsNeeded,
            userId: req.body.userId
        });
        res.status(201).json(course);
    //if the some or all required fields are empty, set HTTP status code to 400     
    } else { res.status(400).json({meassage: "These fields are required."})}
}));


//Send a PUT request to /api/courses/:id UPDATE(edit) a course 
router.put('/courses/:id', asyncHandler(async(req, res, next) => {
    const course = await Course.findByPk(req.params.id, {
        include: [
            {
                model: User,
                as: 'userInfo',
            },
        ]
    });
    //if the course exists, set the course object properties 
    //equal to the new proprties sent to us by the client 
    if(course) {
        course.title = req.body.title;
        course.description = req.body.description;
        course.estimatedTime = req.body.estimatedTime;
        course.materialsNeeded = req.body.materialsNeeded;
        course.userId = req.body.userId; 

        //passing the new course to the update method
        await Course.update(course); 
        res.status(204).end();
    
    } else {res.status(404).json({message: "course not found."})}

}));


//Send a DELETE request to /api/courses/:id DELETE a course
router.delete('/courses/:id', asyncHandler(async(req, res, next)=> {
    const course = await Course.findByPk(req.params.id, {
        include: [
            {
                model: User,
                as: 'userInfo',
            },
        ]
    });
    //if the course exists, delete the course 
    if(course) {
        await Course.destroy(course);
        res.status(204).end();
    } else {res.status(404).json({message: "Course not found."})}
   
}));

module.exports = router;