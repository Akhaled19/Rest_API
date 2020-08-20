# Full Stack JavaScript Techdegree v2 - REST API Project
Overview of the Provided Project Files
We've supplied the following files for you to use:

The seed folder contains a starting set of data for your database in the form of a JSON file (data.json) and a collection of files (context.js, database.js, and index.js) that can be used to create your app's database and populate it with data (we'll explain how to do that below).
We've included a .gitignore file to ensure that the node_modules folder doesn't get pushed to your GitHub repo.
The app.js file configures Express to serve a simple REST API. We've also configured the morgan npm package to log HTTP requests/responses to the console. You'll update this file with the routes for the API. You'll update this file with the routes for the API.
The nodemon.js file configures the nodemon Node.js module, which we are using to run your REST API.
The package.json file (and the associated package-lock.json file) contain the project's npm configuration, which includes the project's dependencies.
The RESTAPI.postman_collection.json file is a collection of Postman requests that you can use to test and explore your REST API.

## Getting Started
To get up and running with this project, run the following commands from the root of the folder that contains this README file.

* First, install the project's dependencies using npm.
npm install

* Second, seed the SQLite database.
npm run seed

* And lastly, start the application.
npm start

To test the Express server, browse to the URL http://localhost:5000/.

## Explanation
This project is a REST API for a fullstack school course application. It uses one of the most popular databases(SQLite) to store data. Additionally, this app uses Node.JS and Sequelize to perform CRUD(Create, Read, Update, and Delete) operations that allow a user to update the database with new or existing information as well as delete information. The API will provide a way for users to administer a school database containing information about courses: users can interact with the database by retrieving a list of courses, as well as adding, updating and deleting courses in the database. In addition, the project will require users to create an account and log-in to make changes to the database.

## For a live demo of this project, go to this link: COMING SOON

## Task
My task this project is to create a backend for a fullstack school course application. This backend will allow a user to create an account to create, edit, and delete their own courses. This project also shows my working knowledge of creating routes with Node, using vanillaJS to make custom validations, using SEQUELIZE to interact with a database and make data modeling, validation, and persistence.

## This project taught me how to:

* Create a SQLite database
* Interact with the database indirectly using an ORM like Sequelize
* Creating routes with Node.js
* Perform CRUD operations by passing data through Node.js routes
* Creating input validations using express-validations npm package
* Seed a database with starter data
* Create user authorization checks using basic-auth npm package
* Use Postman application to check if routes are performing CRUD operations correctly
* Create one to many and many to one associations between two models in a database
* Hashing and salting passwords so data is not stored as plain text

## Technology Used
This project uses the following technologies:

* SQLite(https://www.sqlite.org/index.html)
* Sequelize ORM(https://sequelize.org/)
* Node.js(https://nodejs.org/en/)
* JavaScript
* CSS
* NPM Packages
