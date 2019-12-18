import React from "react";
import axios from "axios";
import { CUSTOM_SEARCH_LINK } from "./constants";
import Table from "./Table";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: [],
      searchText: ""
    };
  }

  getGoogleSearchData = link => {
    // set loading to true
    this.setState({ isLoading: true });
    // get results in json format
    axios.get(link).then(response => {
      this.setState({ data: response.data.items, isLoading: false });
    });
  };

  handleChange = event => {
    this.setState({ searchText: event.target.value });
  };
  onSearch = () => {
    // appending search query
    const finalLink = CUSTOM_SEARCH_LINK + this.state.searchText;
    this.getGoogleSearchData(finalLink);
  };

  render() {
    const columns = [
      {
        Header: "Google Results",
        columns: [
          {
            Header: "Name",
            accessor: "title"
          },
          {
            Header: "Link",
            accessor: "link"
          }
        ]
      }
    ];

    return (
      <>
        <div>
          <input
            type="text"
            value={this.state.searchText}
            onChange={this.handleChange}
          />
          <button type="submit" onClick={this.onSearch}>
            Search
          </button>
        </div>
        {this.state.isLoading ? (
          <div>Loading...</div>
        ) : (
          <Table columns={columns} data={this.state.data} />
        )}
      </>
    );
  }
}

export default App;
