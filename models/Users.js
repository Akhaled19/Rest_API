const Sequelize = require('sequelize');

//Define a Users model 
class Users extends Sequelize.Model {}

//Initialize a User model 
Users.init({
    id: Sequelize.INTEGER,
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    emailAddress: Sequelize.STRING,
    password: Sequelize.STRING
}, {Sequelize});