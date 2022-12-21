import { Component } from "react";

export default class UserSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      isSearch: false,
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleOnReset = () => {
    this.setState({
      isSearch: false
    })
    this.props.search()
  }

  handleOnSubmit = (event) => {
    event.preventDefault();
    this.props.search({ name: this.state.name, phone: this.state.phone });
    this.setState({
      isSearch: true
    });
  };

  render() {
    return (
      <form id="search" onSubmit={this.handleOnSubmit}>
        <div className="row pb-3">
          <div className="col">
            <label htmlFor="name-search" className="col-sm-2 col-form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name-search"
              name="name"
              onChange={this.handleInputChange}
              value={this.state.name}
            />
          </div>
          <div className="col">
            <label htmlFor="phone-search" className="col-sm-2 col-form-label">
              Phone
            </label>
            <input
              type="tel"
              className="form-control"
              id="phone-search"
              name="phone"
              onChange={this.handleInputChange}
              value={this.state.phone}
            />
          </div>
        </div>
        <button type="submit" form="search" className="btn btn-secondary col-sm-2 mx-1">
          Search
        </button>
        {this.state.isSearch ? (
          <button type="button" className="btn btn-warning col-sm-2 mx-1" onClick={this.handleOnReset}>
            Reset
          </button>
        ) : (
          ""
        )}
      </form>
    );
  }
}
