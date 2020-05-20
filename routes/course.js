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
            res.status(500).json({message: error.message});
            next(error);
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
            //select only some attributes
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
router.post('/courses', asyncHandler(async(req, res) => { 
    let course;
    try{
        //if all the required fields have been submitted, redirect to home & set HTTP status code to 201 
        course = await Course.create(req.body);
        res.status(201).location(`/api/courses/${course.id}`).end();

    } catch (error){
        //checking the errors 
        if(error.name === "SequelizeValidationError" ) {
            const errors = error.errors.map((err) => { return {
                attribute: err.path,
                message: err.message
            }}); 
            //display simplified error messages and set HTTP status code to 400 
            res.status(400).json(errors);

        //error caught in the asynchandler's catch block    
        } else {throw error}
    }
}));


//Send a PUT request to /api/courses/:id UPDATE(edit) a course 
router.put('/courses/:id', asyncHandler(async(req, res) => {
    const course = await Course.findByPk(req.params.id);
        //if course exist, then update its body 
        if(course) {
            //wrapping everyting in a conditional statemnet that checks if all the required properties have values 
            if(req.body.title && req.body.description) {
                try {
                    //passing the new course to the update method
                    await course.update(req.body); 
                    res.status(204).end();

                } catch (error) {
                    if(error.name === "SequelizeValidationError") {
            
                        const errors = error.errors.map((err) => { return {
                            attribute: err.path,
                            message: err.message 
                        }});
            
                        //display simplified error messages and set HTTP status code to 400 
                        res.status(400).json(errors);
            
                    //error caught in the asynchandler's catch block    
                    } else {throw error}
                } 
            }  else { res.status(400).json('Title and Description properties are required')}    

        } else {res.status(404).json({message: "course not found."})}


}));


//Send a DELETE request to /api/courses/:id DELETE a course
router.delete('/courses/:id', asyncHandler(async(req, res) => {
    const course = await Course.findByPk(req.params.id);
    //if the course exists, delete the course 
    if(course) {
        await course.destroy();
        res.status(204).end();
    } else {res.status(404).json({message: "Course not found."})}
   
}));

module.exports = router;