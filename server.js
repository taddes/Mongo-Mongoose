// npm package dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var request = require("request"); 
var logger = require("morgan");
var cheerio = require("cheerio");
var exhbs = require("express-handlebars");

// Initialize express erver
var app = express();

// Static IP Public folder
app.use(express.static("public"));

// Body Parser
app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended: false}));

// mongoose 
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);
var db = mongoose.connection;

db.on("error", function(err) {
	console.log("Mongoose error: ", err);
});

db.once("open", function() {
	console.log("Mongoose successful");
});


// Routes
app.get("/", function(req, res) {
	res.send(index.html);
});

// Models 
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");


// Scrape
// =====================================================================
app.get("/scrape", function(req, res){
	request("http://trekmovie.com/", function(error, response, html) {

		var $ = cheerio.load(html);

		$("h3.entry-title").each(function(i, element) {
				var result = {};
				result.title = $(this).children().text();
				result.link = $(this).children().attr("href");

			var entry = new Article (result);

			entry.save(function(err, doc) {

				if(err) {
					console.log(err);
				} else {
					console.log(doc);
				}

			});
		});
	}); // Close app.get /scrape

	res.send("Scrape Complete");

});

// Get for /articles
app.get("/articles", function(req, res) {

	Article.find({}, function(err, doc) {

		if(err) {
			console.log(err);
		} else { res.json(doc); }

	});

});

// specific article
app.get("/articles/:id", function (req, res) {

	Article.findOne({"_id": req.params.id})
	.populate("note")
	.exec(function(err, doc) {

		if(err){
			console.log(err)
		} else { res.json(doc) }

	});
});

app.post("/articles/:id", function(req, res) {

	var newNote = new Note(req.body);

	newNote.save(function(err, doc) {

		if (err) {
			console.log(err);
		} else {
				Article.findOneAndUpdate({"_id": req.params.id}, {"note": doc._id})
					.exec(function(err, doc) {
						if(err){
							console.log(err);
						} else { res.send(doc); }
					});
				}
			});
	});

// Listener
app.listen(process.env.PORT || 3000, function() {
  console.log("Listening on port: " + this.address().port);
});

