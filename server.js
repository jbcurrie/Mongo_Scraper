//server file should require all dependencies mongoose to run queries to db and cheerio to work
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const moment = require("moment");
const app = express();
const PORT = process.env.PORT || 8889;
const routes = require("./routes");

const logger = require("morgan");
const request = require("request");
const cheerio = require("cheerio");

// Requiring our Note and Article models
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");


// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Serve up static assets
app.use(express.static("client/build"));

// not sure we need to have an express static anymore
// app.use(express.static("public"));

app.use(routes);

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/scraper_app",
  {
    useMongoClient: true
  }
);
const db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
  });
  // Once logged in to the db through mongoose, log a success message
db.once("open", function() {
    console.log("Mongoose connection successful.");
  });

// ROUTES - WILL MOVE TO ROUTES FOLDER, AND LINK IN WITH REACT
// A GET request to scrape the echojs website

// '/scrape moved to api, and called "/" which means 'api/articles' - get all articles  from the scrape
// app.get("/scrape", function(req, res) {
//     // First, we grab the body of the html with request
//     request("https://www.charlotteagenda.com/", function(error, response, html) {
//       // Then, we load that into cheerio and save it to $ for a shorthand selector
//       var $ = cheerio.load(html);
//       // Now, we grab every h2 within an article tag, and do the following:
//       $("div.indexstory").each(function(i, element) {
        
//         function saveDate(scrapeDate) {
//           return moment(scrapeDate).format('YYYY-MM-DD')
//         }
        
//         // Save an empty result object
//         var result = {};
  
//         // Add the text and href of every link, and save them as properties of the result object
//         result.title =$(this).find("h1.entry-title").text()
//         result.link = $(this).find("h1.entry-title").children("a").attr("href")
//         result.tag = $(this).find("div.entry-item").find("a.indextag").text()
//         result.image = $(this).find("div.thumbnail_image").children("a").children("img").attr("src")
//         result.blurb = $(this).find("div.excerpt.fullview").text()
//         result.date= saveDate($(this).find(".bylinedate").text())
  
//         // Using our Article model, create a new entry
//         // This effectively passes the result object to the entry (and the title and link)
//         var entry = new Article(result);
  
//         // Now, save that entry to the db
//         entry.save(function(err, doc) {
      
//           // Log any errors
//           if (err) {
//             console.log(err);
//           }
//           // Or log the doc
//           else {
//             console.log(doc);
//           }
//         });
  
//       });
//     });
//     // Tell the browser that we finished scraping the text
//     res.send("Scrape Complete");
// });
  
// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});


//BELOW IS FOR AJAX REQUESTS

// // Configure body parser for AJAX requests
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// // Serve up static assets
// app.use(express.static("client/build"));
// // Add routes, both API and view
// app.use(routes);
