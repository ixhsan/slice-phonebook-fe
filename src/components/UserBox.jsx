import { Component } from "react";
import UserList from "./UserList";
import UserForm from "./UserForm";
import UserSearch from "./UserSearch";

export default class UserBox extends Component {
  constructor(props) {
    super(props);
    this.params = {
      page: 1,
      pages: 1,
    };
    this.state = {
      users: [],
      tabId: "add-form",
    };
  }

  componentDidMount() {
    this.loadContact();
  }

  loadContact = () => {
    fetch(
      `http://localhost:3039/api/phonebooks?${new URLSearchParams(this.params)}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState((state) => ({
          users: [
            ...(this.params.page === 1 ? [] : state.users),
            ...data.data.contacts.map((item) => {
              item.sent = true;
              return item;
            }),
          ],
        }));
        this.params.page = data.data.page;
        this.params.pages = data.data.pages;
      });
  };

  loadMore = () => {
    if (this.params.page <= this.params.pages) {
      this.params = {
        ...this.params,
        page: this.params.page + 1,
      };
      this.loadContact();
    }
  };

  addUser = (name, phone) => {
    const id = Date.now();
    if (this.params.page === this.params.pages) {

    }
    this.setState(function (state, props) {
      return {
        users: [
          ...state.users,
          {
            id,
            name,
            phone,
            sent: true,
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
        this.setState(function (state) {
          return state.users.map((item) => {
            if (item.id === id) {
              item.id = data.data.id;
              item.sent = true;
            }
            return item;
          });
        });
      })
      .catch((error) => {
        this.setState(function (state) {
          return state.users.map((item) => {
            if (item.id === id) {
              item.sent = false;
            }
            return item;
          });
        });
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
                  sent: true,
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

  resendContact = ({ id, name, phone }) => {
    fetch("http://localhost:3039/api/phonebooks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phone }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState(function (state) {
          return state.users.map((item) => {
            if (item.id === id) {
              item.id = data.data.id;
              item.sent = true;
            }
            return item;
          });
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
    setTimeout(() => {}, 2500);
  };

  handleTabClick = (event) => {
    this.setState({
      tabId: event.target.dataset.tab,
    });
  };

  searchContact = (query = {}) => {
    this.params = {
      ...this.params,
      ...query,
      page: 1,
    };
    console.log(
      "🚀 ~ file: UserBox.jsx:191 ~ UserBox ~ this.params",
      this.params
    );
    this.loadContact();
  };

  test = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <div className="container">
        <br />
        <div className="card">
          <div className="card-header my-2">
            <h1>Phonebook</h1>
          </div>
          <div className="card-body">
            <ul className="nav nav-tabs mb-3" id="ex1" role="tablist">
              <li className="nav-item" role="presentation">
                <a
                  className={
                    this.state.tabId === "add-form"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  id="add"
                  data-mdb-toggle="tab"
                  data-tab="add-form"
                  href="#add-form"
                  role="tab"
                  aria-controls="add-form"
                  aria-selected="true"
                  onClick={this.handleTabClick}
                  // onChange={this.handleTabState}
                >
                  Contact
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  className={
                    this.state.tabId === "search-form"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  id="search"
                  data-mdb-toggle="tab"
                  data-tab="search-form"
                  href="#search-form"
                  role="tab"
                  aria-controls="search-form"
                  aria-selected="false"
                  onClick={this.handleTabClick}
                  // onChange={this.handleTabState}
                >
                  Search
                </a>
              </li>
            </ul>

            <div className="tab-content" id="ex1-content">
              <div
                className={
                  this.state.tabId === "add-form"
                    ? "tab-pane fade show active"
                    : "tab-pane fade"
                }
                id="add-form"
                role="tabpanel"
                aria-labelledby="add"
              >
                <div className="form-group">
                  <div className="row">
                    <h2>Add new contact</h2>
                  </div>
                  <div className="row pb-3">
                    <UserForm add={this.addUser} />
                  </div>
                </div>
              </div>
              <div
                className={
                  this.state.tabId === "search-form"
                    ? "tab-pane fade show active"
                    : "tab-pane fade"
                }
                id="search-form"
                role="tabpanel"
                aria-labelledby="search"
              >
                <h2>Search contact</h2>
                <UserSearch search={this.searchContact} />
              </div>
            </div>

            <hr />
            <UserList
              data={this.state.users}
              resend={this.resendContact}
              delete={this.deleteContact}
              update={this.updateContact}
              loadMore={this.loadMore}
            />
          </div>
          <div className="card-footer"></div>
        </div>
      </div>
    );
  }
}

// import React, { Component } from 'react';

// export default class UserBox extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: '',
//       phone: '',
//       key: '',
//       formValues: [{
//         Name: 'ikhsan',
//         Phone: '08093123'
//       }],
//     };
//   }

//   handleChange = (event) => {
//     const { name, value } = event.target;
//     this.setState({ [name]: value });
//   }

//   handleSubmit = (event) => {
//     event.preventDefault();
//     console.log(`Name: ${this.state.name}`);
//     console.log(`Phone: ${this.state.phone}`);
//   }

//   saveValuesToLocalStorage = () => {
//     const formValues = [...this.state.formValues, { name: this.state.name, phone: this.state.phone }];
//     localStorage.setItem(this.state.key, JSON.stringify(formValues));
//   }

//   loadValuesFromLocalStorage = () => {
//     const storedValues = JSON.parse(localStorage.getItem(this.state.key));
//     if (storedValues) {
//       this.setState({ formValues: storedValues });
//     } else {
//       console.log('Invalid key');
//     }
//   }

//   render() {
//     return (
//       <>
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           Key:
//           <input
//             type="text"
//             name="key"
//             value={this.state.key}
//             onChange={this.handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Name:
//           <input
//             type="text"
//             name="name"
//             value={this.state.name}
//             onChange={this.handleChange}
//           />
//         </label>
//         <br />
//         <label>
//           Phone:
//           <input
//             type="text"
//             name="phone"
//             value={this.state.phone}
//             onChange={this.handleChange}
//           />
//         </label>
//         <br />
//         <input type="submit" value="Submit" />
//         <br />
//         <button onClick={this.saveValuesToLocalStorage}>Save to local storage</button>
//         <br />
//         <button onClick={this.loadValuesFromLocalStorage}>Load from local storage</button>
//       </form>
//       <ul>
//         {this.state.formValues.map((formValue, index) => (
//           <li key={index}>{`Name: ${formValue.name}, Phone: ${formValue.phone}`}</li>
//         ))}
//       </ul>
//       </>
//     );
//   }
// }