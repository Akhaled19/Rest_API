'use strick';

const Sequelize = require('sequelize');

//export the initialized Courses model 
module.exports = (sequelize) => {
    //defining the Courses model
    class Course extends Sequelize.Model {};
    //initializing the Courses model 
    Course.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    //Custom error message 
                    msg: 'Please enter a valid title. '
                }
            }
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
            validate: {
                notEmpty: {
                    //Custom error message
                    msg: 'Please provide a value for "description" '
                }
            }
        },
        estimatedTime: {
            type: Sequelize.STRING
        },
        materialsNeeded: {
            type: Sequelize.STRING
        }    
    }, {sequelize});

    //defining sequelize Data Association 
    Course.associate = (model) => {
        Course.belongsTo(model.User, {
            as: 'userInfo',
            foreignKey: {
                fieldName: 'userId',
                allowNull: false
            }
        });
    }

    return Course;
}