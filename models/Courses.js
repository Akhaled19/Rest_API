'use strick';

const Sequelize = require('sequelize');

//export the initialized Courses model 
module.exports = (sequelize) => {
    //defining the Courses model
    class Courses extends Sequelize.Model {};
    //initializing the Courses model 
    Courses.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: Sequelize.INTEGER,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                //Custom error message 
                msg: 'Please provide a value for "title" '
            }
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true,
                //Custom error message
                msg: 'Please provide a value for "description" '
            }
        },
        esttimatedTime: {
            type: Sequelize.STRING
        },
        materialsNeeded: {
            type: Sequelize.STRING
        }    
    }, {sequelize});

    //defining sequelize Data Association 
    Courses.associate = (model) => {
        Courses.belongsTo(model.Users);
    }

    return Courses;
}

//Synchronize the model
(async() => {
    await Courses.sync();

    try {

    } catch (error) {
        console.error('Error connecting to the database: ', error);
    }
})();