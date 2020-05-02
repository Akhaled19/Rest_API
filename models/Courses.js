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