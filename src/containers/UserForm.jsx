import { Component, Fragment } from "react";
import { connect } from "react-redux";
import { addContact } from "../actions/PhoneBook_action";

class UserForm extends Component {
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
      <Fragment>
        <div className="row">
          <h2>Add new contact</h2>
        </div>
        <form onSubmit={this.handleOnSubmit}>
          <div className="row mt-1 mb-4">
            <div className="row my-1">
              <div className="col-sm-6">
                <label htmlFor="name" className="col-sm-2 col-form-label">
                  Name
                </label>
                <div className="col-sm-12">
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

              <div className="col-sm-6">
                <label htmlFor="phone" className="col-sm-2 col-form-label">
                  Phone
                </label>
                <div className="col-sm-12">
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
            </div>

            <div className="row my-1">
              <div className="col-sm-6">
                <button type="submit" className="btn btn-primary col-sm-4">
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  add: (name, phone) => {
    dispatch(addContact(name, phone));
  },
});

export default connect(null, mapDispatchToProps)(UserForm);
