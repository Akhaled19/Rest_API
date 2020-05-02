const Sequelize = require('sequelize');

class Courses extends Sequelize.Model {}
Courses.init({
    id: Sequelize.INTEGER,
    userId: Sequelize.INTEGER,
    title: Sequelize.STRING,
    description: Sequelize.TEXT,
    esttimatedTime: Sequelize.STRING,
    materialsNeeded: Sequelize.STRING
}, {Sequelize});

//Synchronize the model
(async() => {
    await Courses.sync();

    try {

    } catch (error) {
        console.error('Error connecting to the database: ', error);
    }
});