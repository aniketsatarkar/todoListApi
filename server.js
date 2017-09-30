var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var mongoose = require('mongoose');
var Task = require('../todoListApi/api/models/todoListModel');
var bodyParse = require('body-parser'); 

// mongoose instance connection url connection.
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb');

app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());

// Middleware basically intercepts incomming http requests and
// as such you can use them to perform several operations ranging
// from authentication to validation etc.
app.use(function(req, res){
    res.status(404).send({url: req.originalUrl + ' not found'});
});

var routes = require('../todoListApi/api/routes/todoRoutes');
routes(app); // register the route.

app.listen(port); // start the application at specified port.
console.log('todo list RESTful API server started on: ' + port);
