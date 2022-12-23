import { Component } from "react";

export default class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleOnSubmit = (event) => {
    event.preventDefault();
    this.props.add(this.state.name, this.state.phone);
    this.setState({
      name: "",
      phone: "",
    });
  };

  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        <div className="row">
        <div className="row mb-3">
          <label htmlFor="name" className="col-sm-2 col-form-label">
            Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={this.handleInputChange}
              value={this.state.name}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="phone" className="col-sm-2 col-form-label">
            Phone
          </label>
          <div className="col-sm-10">
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              onChange={this.handleInputChange}
              value={this.state.phone}
              required
            />
          </div>
        </div>
        
        <div className="col">
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        </div>
        </div>
      </form>
    );
  }
}
