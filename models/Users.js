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

//Synchronize the model 
(async() => {
    await Users.sync();
    try{  

    } catch (error){
        console.error('Error connecting to the database: ', error);
    }
    
});