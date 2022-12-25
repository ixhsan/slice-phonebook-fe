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
      locals: [],
      stored: [],
      key: "failed-to-send",
      tabId: "search-form",
    };
  }

  componentDidMount() {
    this.loadContact();
  }

  componentDidUpdate() {
    console.log("OP ~ ComponentDidUpdate");
  }

  loadContact = () => {
    fetch(
      `http://localhost:3039/api/phonebooks?${new URLSearchParams(this.params)}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.params.page = data.data.page;
        this.params.pages = data.data.pages;
        console.log(
          "OP ~ LoadContact page/pages",
          this.params.page + "/" + this.params.pages
        );

        this.setState((state) => ({
          users: [
            ...(this.params.page === 1 ? [] : state.users),
            ...data.data.contacts.map((item) => {
              item.sent = true;
              return item;
            }),
            ...(this.params.page === this.params.pages
              ? this.localsLoad()
              : []
            ).filter((item) => item.sent === false),
          ],
        }));
      });
  };

  loadMore = () => {
    if (this.params.page < this.params.pages) {
      this.params = {
        ...this.params,
        page: this.params.page + 1,
      };
      this.loadContact();
    }
    console.log("🚀 ~ page/pages", this.params.page, "/", this.params.pages);
  };

  localsLoad = () => {
    console.log("🚀 Running OP-LOAD ~ Checking localStorage");
    const loadStorage = JSON.parse(localStorage.getItem(this.state.key));

    if (loadStorage !== null) {
      console.log(
        "OP ~ LOAD ~ localStorage is not null, returning the array",
        loadStorage
      );

      return loadStorage;
    } else {
      console.log(
        "OP ~ LOAD ~ localStorage is null, returning with empty array"
      );
      return [];
    }
  };

  localsSave = (data) => {
    try {
      console.log("OP ~ SaveLocals - Property sent object data", data[0].sent);
      let loadStorage = JSON.parse(localStorage.getItem(this.state.key));
      let checkDoubles =
        loadStorage !== null
          ? loadStorage.filter((item) => item.id === data[0].id)
          : [1];
      console.log("OP ~ SaveLocals - checkDoubles value", checkDoubles);
      console.log("comparing data and localStorage", { ...data, loadStorage });

      if (loadStorage === null) {
        console.log(
          "OP ~ SaveLocals - null local storage: setting array...",
          ...data,
          Date.now()
        );
        localStorage.setItem(this.state.key, JSON.stringify([...data]));
      } else if (checkDoubles?.length < 1) {
        console.log(
          "array is set and no double in localStorage: pushing...",
          ...data,
          Date.now()
        );
        loadStorage.push(...data);
        localStorage.setItem(this.state.key, JSON.stringify(loadStorage));
      } else {
        console.log("there is double in localStorage");
      }
    } catch (error) {
      console.log('error saving into localstorage', error);
    }
  };

  localsDelete = (id) => {
    try {
      let loadStorage = JSON.parse(localStorage.getItem(this.state.key));
      let newData = loadStorage.filter((item) => item.id !== id);
      localStorage.setItem(this.state.key, JSON.stringify([...newData]));
    } catch (error) {
      console.log(error);
    }
  };

  localsGet = (id) => {
    const checkForData = JSON.parse(localStorage.getItem(this.state.key))
    return checkForData.filter(item => item.id === id).length > 0 ? true : false
  }

  addUser = (name, phone) => {
    console.log("OP ~ Save ~ Saving data of", name + "/" + phone);
    const id = Date.now();
    const db = this.params.page === this.params.pages ? "users" : "locals";
    console.log(
      "OP ~ Save ~ running on page/pages",
      this.params.page,
      this.params.pages,
      "and db of",
      db
    );
    const newContact = {
      id,
      name,
      phone,
      sent: true,
    };

    this.setState(function (state) {
      return {
        [db]: [...state[db], newContact],
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
        this.setState(
          function (state) {
            if (this.params.page === this.params.pages) {
              console.log("OP ~ add ~ kuadran 2 ~ success-con, equal page");
              return state.users.map((item) => {
                if (item.id === id) {
                  item.id = data.data.id;
                  item.sent = true;
                }
                return item;
              });
            } else {
              console.log("OP ~ Save ~ kuadran 1 ~ successs-con, unequal page");
              return {
                locals: [
                  ...state.locals,
                  ...state.users.map((item) => {
                    if (item.id === id) {
                      item.id = data.data.id;
                      item.sent = true;
                    }
                    return item;
                  }),
                ],
              };
            }
          },
          () =>
            this.localsSave(this.state.locals.filter((item) => item.id === id))
        );
      })
      .catch((error) => {
        console.log("OP~Save ~ error", error);
        this.setState(
          function (state) {
            if (this.params.page === this.params.pages) {
              console.log(`OP ~ add ~ kuadran 4 ~ error-con, equal page`);
              return {
                locals: [
                  ...state.locals,
                  ...state.users.map((item) => {
                    if (item.id === id) {
                      item.id = id;
                      item.sent = false;
                    }

                    return item;
                  }),
                ],
              };
            } else {
              console.log("OP ~ add ~ kuadran 3 ~ error-con, unequal page");
              return state.locals.map((item) => {
                if (item.id === id) {
                  item.sent = false;
                }
                return item;
              });
            }
          },
          () =>
            this.localsSave(this.state.locals.filter((item) => item.id === id))
        );
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

  deleteContact = ({ id, sent }) => {

    if (this.localsGet(id) && !sent) {
      this.localsDelete(id)
      this.setState(function (state) {
        return {
          users: state.users.filter((item) => item.id !== id),
        };
      });
    }

    fetch(`http://localhost:3039/api/phonebooks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.data !== 0) {
          this.setState(function (state) {
            return {
              users: state.users.filter((item) => item.id !== id),
            };
          });
          
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  resendContact = ({ id, name, phone, sent }) => {
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

        if (!sent) {
          this.localsDelete(id);
        }
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
    this.loadContact();
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
                >
                  Search
                </a>
              </li>
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
                  Add
                </a>
              </li>
            </ul>

            <div className="tab-content" id="ex1-content">
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
                <UserSearch search={this.searchContact} />
              </div>
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
                  <UserForm add={this.addUser} />
                </div>
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
          <div className="card-footer">
            <button type="button" onClick={this.loadFailedToSend}>
              test
            </button>
            <button type="button" onClick={this.loadFailedToSend2}>
              test2
            </button>
          </div>
        </div>
      </div>
    );
  }
}
