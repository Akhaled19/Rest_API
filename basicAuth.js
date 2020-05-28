const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');
const {User} = require('./models');

//Authentication Middleware to wrap eeach route that needs to be protected 
const authenticateUser = async(req, res, next) => {
    let message =  '';
    //parse the user's credentials from the authorization header 
    const credentials = auth(req);

    //if user's credentials are available...
    if(credentials) {
        //retrieve user from the db by email address.
        // The email is supplied as the user's key in the Authorization header, but in the credentials it is stored as name   
        const user = await User.findOne({ where: { emailAddress: credentials.name }});
        
        console.log(`the user is : ${user}`);
         //if a user was succesfully found
        if(user) {
            //using compareSync bcryptjs method to compare the hashed-salted password with the credential pass
            const authenticated = bcryptjs.compareSync(credentials.pass, user.password);
            
            //if the password match...    
            if(authenticated) {
                console.log(`Authentication sucessful for username: ${user.emailAddress}`);
                //add the user account to the request object
                req.currentUser = user;
            } else {
                message = `Authentication failure for email address: ${user.emailAddress}`;
            }   
        } else {
            message = `Authentication failure for email address: ${credentials.name}`;
        }
    } else {
        message = 'Auth header not found';
    }

    //if user authentication failed...
    if(message) {
        console.warn(message);
        //return a response with a 401 HTTP status code
        res.status(401).json({ message: 'Access Denied.' });
    //or if user authenication succeeded...    
    } else {
        next();
    }
};

module.exports = {authenticateUser}