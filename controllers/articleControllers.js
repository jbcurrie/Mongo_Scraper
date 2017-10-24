const db = require("../models");
const cheerio = require("cheerio");
const moment = require("moment");
const request = require("request");
//request npm request package

module.exports = {
    findAll: function(req, res) {
      db.Article
        .find(req.query)
        .sort({ date: -1 })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
        //request function goes here
        //
        db.Article
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    scrape: function(req, res) {
        request("https://www.charlotteagenda.com/", function(error, response, html) {
            //could replace parameters with a controller function, but just placing it here for testing purposes
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            let $ = cheerio.load(html);
            // Now, we grab every h2 within an article tag, and do the following:
            $("div.indexstory").each(function(i, element) {
            
                function saveDate(scrapeDate) {
                    return moment(scrapeDate).format('YYYY-MM-DD')
                }
            
                // Save an empty result object
                var result = {};
            
                // Add the text and href of every link, and save them as properties of the result object
                result.title =$(this).find("h1.entry-title").text()
                result.link = $(this).find("h1.entry-title").children("a").attr("href")
                result.tag = $(this).find("div.entry-item").find("a.indextag").text()
                result.image = $(this).find("div.thumbnail_image").children("a").children("img").attr("src")
                result.blurb = $(this).find("div.excerpt.fullview").text()
                result.date= saveDate($(this).find(".bylinedate").text())
            
                // Using our Article model, create a new entry
                // This effectively passes the result object to the entry (and the title and link)
            
                var entry = new Article(result);
            
                // Now, save that entry to the db
                entry.save(function(err, doc) {
            
                    //   // Log any errors
                    if (err) {
                        console.log(err);
                    }
                    //   // Or log the doc
                    else {
                        console.log(doc);
                    }
                });
            });
        })
    }
};