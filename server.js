/* Empty JS object to act as endpoint for all routes */
projectData = {};

/* Express to run server and routes */
const express = require('express');

/* Start up an instance of app */
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

/* Initialize the main project folder*/
app.use(express.static('website'));

const port = 8000;
/* Spin up the server*/
app.listen(port, () => {
    console.log(`running on localhost: ${port}`);
});


// POST route
app.post('/sendData', (request, response) => {

    projectData.date = request.body.date
    projectData.temp = request.body.temp
    projectData.content = request.body.content
});

// GET route
app.get('/retrieveData', (request, response) => {
    response.send(projectData);
});
