const router = require("express").Router();
const articleController = require("../../controllers/articleControllers");

// Matches with "/api/articles"
//post needs to scrape for acticles
router.route("/")
  .get(articleController.findAll)
  .post(articleController.create);
router.route("/scrape")
  .get(articleController.scrape)
// Tell the browser that we finished scraping the text
// // Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .get(booksController.findById)
//   .put(booksController.update)
//   .delete(booksController.remove);

module.exports = router;
