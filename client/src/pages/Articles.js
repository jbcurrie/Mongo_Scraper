import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/Api";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";

class Articles extends Component {
    //will change this when updating articles with routes besides find all
  state = {
    Articles: [],
    title: ""
    // author: "",
    // synopsis: ""
  };

  componentDidMount() {
    // this.loadArticles();
    //api scraper article, says get the scrape route, return data results (already formatted), and set the state with the results
        //find a way to avoid duplicate articles (some unique identifier), from rendering to the page
    //next we'll map the article array data to the page (doesn't require a save, doesn't require db query)
    //finally, a button will trigger the saveArticles function, runs the create document query to save the scraped articles to the db
    
    API.scrapeArticle().then(res =>
      this.setState({ articles: res.data, title: ""})
    )
    .catch(err => console.log(err));
  }

  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ articles: res.data, title: ""
        // , author: "", synopsis: "" 
        })
      )
      .catch(err => console.log(err));
  };

  //   deleteBook = id => {
  //     API.deleteBook(id)
  //       .then(res => this.loadBooks())
  //       .catch(err => console.log(err));
  //   };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  //replace with some function that saves http data, or just 
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      //if
      API.saveArticle({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadArticles())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Charlotte Agenda Scraper</h1>
            </Jumbotron>
          </Col>
          <Col size="md-6">
            <Jumbotron>
              <h1>Articles Scraped</h1>
            </Jumbotron>
            {this.state.Articles.length ? (
              <List>
                {this.state.Articles.map(article => (
                  <ListItem key={this.state.Articles.title}>
                    {/* <Link to={"/articles/" + Article._id}> */}
                      <strong>
                        {this.state.Article.title}
                      </strong>
                    {/* </Link> */}
                    {/* <DeleteBtn onClick={() => this.deleteBook(book._id)} /> */}
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;
