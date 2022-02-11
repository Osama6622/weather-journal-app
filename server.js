// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port = 5000;

app.listen(port, listening);

// Callback function for testing the server
function listening() {
    console.log(`Server running on localhost:${port}`);
}
// Post Data Route
app.post('/postData', postData);

//callback function for post route
function postData(req,res) {
    projectData = req.body;
    console.log(projectData);
}

// Get Data Route
app.get('/getData', getData);

//callback function for get route
function getData(req,res) {
    res.send(projectData);
}