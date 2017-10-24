import axios from "axios";

export default {
    // Gets all books
    getArticles: function() {
      return axios.get("/api/articles");
    },
    saveArticle: function(articleData) {
      return axios.post("/api/articles", articleData);
    },
    scrapeArticle: function() {
      return axios.get("/scrape")
    }
}