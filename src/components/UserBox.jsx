import { Component } from "react";
import UserList from "./UserList";
import UserForm from "./UserForm";
import UserSearch from "./UserSearch";

export default class UserBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:3039/api/phonebooks")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          users: data.data,
        });
      });
  }

  componentWillUnmount() {}

  addUser = (name, phone) => {
    this.setState(function (state, props) {
      return {
        users: [
          ...state.users,
          {
            name,
            phone,
          },
        ],
      };
    });

    fetch("http://localhost:3039/api/phonebooks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phone }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  updateContact = ({ id, name, phone }) => {
    fetch(`http://localhost:3039/api/phonebooks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name, phone }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState(function (state) {
          return {
            users: state.users.map((item) => {
              if (item.id === data.data.id) {
                return {
                  id: data.data.id,
                  name: data.data.name,
                  phone: data.data.phone,
                };
              }
              return item;
            }),
          };
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  deleteContact = (id) => {
    fetch(`http://localhost:3039/api/phonebooks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.data !== 0)
          this.setState(function (state) {
            return {
              users: state.users.filter((item) => item.id !== id),
            };
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  searchContact = (query = {}) => {
    fetch(`http://localhost:3039/api/phonebooks?${new URLSearchParams(query)}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          users: data.data,
        });
      });
  };

  render() {
    return (
      <div className="container">
        <br />
        <div className="card">
          <div className="card-header">
            <h1>Phonebook</h1>
          </div>
          <div className="card-body">
            <h2>Add contact</h2>
            <div className="row pb-3">
              <UserForm add={this.addUser} />
            </div>
            <hr />
            <div className="row pb-3">
            <h2>Search contact</h2>
              <UserSearch
                search={this.searchContact}
              />
            </div>
            <hr />
            <UserList
              data={this.state.users}
              delete={this.deleteContact}
              update={this.updateContact}
            />
          </div>
          <div className="card-footer"></div>
        </div>
      </div>
    );
  }
}
