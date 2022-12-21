import { Component } from "react";

export default class UserItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.itemId,
      name: this.props.name,
      phone: this.props.phone,
      isEdit: false,
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleUpdateContact = () => {
    const data = {
      id: this.state.id,
      name: this.state.name,
      phone: this.state.phone,
    };
    this.props.update(data);
    this.setState({
      isEdit: false,
    });
  };

  handleEdit = () => this.setState({ isEdit: true });
  handleCancel = () => {
    this.setState({ isEdit: false });
    this.setState({
      id: this.props.itemId,
      name: this.props.name,
      phone: this.props.phone,
    });
  };

  render() {
    return (
      <tr>
        <td>{this.props.no}</td>
        {this.state.isEdit ? (
          <>
            <td>
              <div className="form-row">
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="form-control col"
                      onChange={this.handleInputChange}
                      value={this.state.name}
                    />
                </div>
              </div>
            </td>
            <td>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    className="form-control col"
                    onChange={this.handleInputChange}
                    value={this.state.phone}
                  />
                </div>
              </div>
            </td>
            <td>
              <button
                type="button"
                className="btn btn-info mx-1"
                onClick={this.handleUpdateContact}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary mx-1"
                onClick={this.handleCancel}
              >
                Cancel
              </button>
            </td>
          </>
        ) : (
          <>
            <td>{this.props.name}</td>
            <td>{this.props.phone}</td>
            <td>
              <button
                type="button"
                className="btn btn-success mx-1"
                onClick={this.handleEdit}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger mx-1"
                onClick={this.props.delete}
              >
                Delete
              </button>
            </td>
          </>
        )}
      </tr>
    );
  }
}
