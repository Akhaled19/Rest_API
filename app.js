'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// setup morgan which gives us http request logging
app.use(morgan('dev'));

//Add routes
//const routes = require('./routes');
// const userRoute = require('./routes/user');
// const courseRoute = require('./routes/course');

//app.use('/api', routes);
// app.use('/course', courseRoute);
// app.use('/user', userRoute);

// TODO setup your api routes here

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

//Send a GET request to /api/courses READ(view) a list of courses (including the user that owns each course)  

//Send a GET request to /api/courses/:id READ(view) a course (including the user that owns it)

//Send a POST request to /api/courses CREATE a course 

//Send a PUT request to /api/courses/:id UPDATE(edit) a course 

//Send a DELETE request to /api/courses/:id DELETE a course


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
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
