import { Component } from "react";

export default class UserForm extends Component {
  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
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
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="phone" className="col-sm-2 col-form-label">
            Phone
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              onChange={this.handleInputChange}
              value={this.state.phone}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    );
  }
}
