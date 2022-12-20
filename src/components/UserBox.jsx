import { Component } from "react";
import UserList from "./UserList";
import UserForm from "./UserForm";

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
          users: data.data
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
      body: JSON.stringify({name, phone}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  render() {
    return (
      <div className="container">
        <br />
        <div className="card">
          <div className="card-header">
            <h1>User List</h1>
          </div>
          <div className="card-body">
            <UserForm add={this.addUser} />
          </div>
          <UserList data={this.state.users} />
          <div className="card-footer"></div>
        </div>
      </div>
    );
  }
}
