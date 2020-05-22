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
                notEmpty: {
                    msg: 'Please provide a value for "firstName" '
                }
            }
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Please provide a value for "lastName" '
                }
            }
        },
        emailAddress: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Please provide a value for "emailAddress"',
                },
                isEmail: {
                    args: true,
                    msg: 'Please enter a valid email address.'
                },
            },
            unique: {
                args: true,
                msg: 'You already have an account with this email address. Please try to login.'
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Please enter a password'
                }
            }
        }
    }, {sequelize});

    //defining sequelize Data Association 
    User.associate = (model) => {
        User.hasMany(model.Course, {
            as: 'userInfo',
            foreignKey: {
                fieldName: 'userId',
                allowNull: false
            }
        });
    }
    return User;
}