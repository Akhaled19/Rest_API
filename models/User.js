'user strick';

const Sequelize = require('sequelize');

// export the initialized Users model 
module.exports = (sequelize) => {
    //Defining the Users model
    class User extends Sequelize.Model {};
    //Initializing the Users model
    User.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                //custom error message 
                msg: 'Please provide a value for "firstName" '
            }
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                //custom error message
                msg: 'Please provide a value for "lastName" '
            }
        },
        emailAddress: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                //custom error message 
                msg: 'Please provide an email address'
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                //Custom error message
                msg: 'Please provide a value for "password" '
            }
        }
    }, {sequelize});

    //defining sequelize Data Association 
    User.associate = (model) => {
        User.hasMany(model.Course, {
            as: 'userInfo' ,
            foreignKey: {
                fieldName: 'userId',
                allowNull: false
            }
        });
    }
    return User;
}

//Synchronize the model 
(async() => {
    await Users.sync();
    try{  

    } catch (error){
        console.error('Error connecting to the database: ', error);
    }
    
})();