// npm modules
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var request = require("request");

// Express
var app = express();
app.use(express.static("public"));

// Port assignment
var PORT = process.env.PORT || 3000;

// Database
var MONGODB_URI = process.env.MONGODB_URI;
var db = require("./models");

//  morgan logger for logging requests
app.use(logger("dev"));

// Models
var Note = require("./models/Note.js");
var Homes = require("./models/Homes.js")

// Mongoose
mongoose.connect(db, function(err, res) {
  if(err) {
    console.log(`Error connecting to ${db}. ${err}`)
  } else {
    console.log(`Successful connection to ${db}`)
  }
});


// Express Handlebars
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// body-parser npm package
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));


// Controller.js require
var router = require("./controllers/controller.js");
app.use("/", router);


// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
