import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { Component } from "react";
import apiKey from "./config";
import axios from "axios";

// App Components
import Nav from './Nav';
import ErrorPage from "./ErrorPage";
import SearchForm from "./SearchForm";
import PhotoContainer from "./PhotoContainer";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      tags: "",
      alps: [],
      website: [],
      computers: [],
      images: [],
      loading: true
    };
  }

  componentDidMount() {
    this.performSearch('alps');
    this.performSearch('website');
    this.performSearch('computers')
  }

  performSearch = (query = "alps") => {
    this.setState({
      loading: true
    });
    axios
      .get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then((response) => {
        if (query === "alps") {
          this.setState({ alps: response.data.photos.photo, loading: false });
        } else if (query === "website") {
          this.setState({ website: response.data.photos.photo, loading: false });
        } else if (query === "computers") {
          this.setState({ computers: response.data.photos.photo, loading: false });
        } else {
          this.setState({
            images: response.data.photos.photo,
            loading: false,
            query: query
          });
        }
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
  };

  render() {
    return (
      <BrowserRouter>

        <div className="container">

          <header>
            <SearchForm onSearch={this.performSearch} />
            <Nav />
          </header>

        {this.state.loading ? (
          <p>Loading...</p>
        ):
          <Switch>
            <Route exact path="/" component={() => <PhotoContainer query="alps" title="Alps" data={this.state.alps} />}  />
            <Route exact path="/alps" component={() => <PhotoContainer query="alps" title="Alps" data={this.state.alps} />} />
            <Route exact path="/website" component={() => <PhotoContainer query="webiste" title="Website" data={this.state.website} />} />
            <Route exact path="/computers" component={() => <PhotoContainer query="computers" title="Computers" data={this.state.computers} />} />
            <Route exact path="/:query" component={() => <PhotoContainer query={this.state.query} data={this.state.images} title={this.state.query} />} />
            <Route component={ErrorPage} />
          </Switch>
        }

        </div>

      </BrowserRouter>
    );
  }
}
