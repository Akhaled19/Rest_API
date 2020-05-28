
const {Course} = require('./models');

//middleare function to wrap each route in a try catch block 
function asyncHandler(callback) {
    return async(req, res, next) => {
        try {
            await callback(req, res, next)
        } catch (error) {
            console.log(error);
            res.status(500).json({message: error.message});
            next(error)
        }
    }
} 

//middleware function to wrap /api/course/:id route to check if the course exists 
async function setCourse( req, res, next){
    const course = await Course.findByPk(req.params.id);
    if(!course) {
        return res.status(404).json({message: "course not found."});
    }
    next();
}

module.exports = {asyncHandler, setCourse};