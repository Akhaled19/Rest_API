'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const Sequelize = require('sequelize');
//const bodyParser = require('body-parser');


const course = require('./routes/course');
const user = require('./routes/user') 



// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

//setup request body JSON parsing
app.use(express.json());
//app.use(bodyParser);

// setup morgan which gives us http request logging
app.use(morgan('dev'));

//test connection with authenticate 
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: "fsjstd-restapi.db" 
});
(async() => {
  try {
    await sequelize.authenticate();
    //syncing the database
    await sequelize.sync();
    console.log('connection has been established sucessfully!');

  } catch (error) {
    console.log('unable to connect to the database: ', error);
  }

})();


// TODO setup your api routes here
app.use('/api', course);
app.use('/api', user);


// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});


// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 8000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
