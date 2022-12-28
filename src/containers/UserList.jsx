import UserItem from "./UserItem";
import { connect } from "react-redux";
import {
  deleteContact,
  loadContact,
  loadMore,
} from "../actions/PhoneBook_action";
import { Component } from "react";

class UserList extends Component {
  componentDidMount() {
    this.props.load();
  }

  handleScrolling = (event) => {
    if (
      event.target.scrollHeight - event.target.scrollTop ===
      event.target.clientHeight
    ) {
      this.props.loadMore();
      console.log("scroll triggered");
    }
  };

  render() {
    return (
      <div
        className="table-responsive"
        style={{ overflowY: "scroll", height: 300 }}
        onScroll={this.handleScrolling}
      >
        <table className="table table-striped">
          <caption>List of contact</caption>
          <thead className="thead-dark">
            <tr>
              <th scope="col" className=" bg-white sticky-top">
                #
              </th>
              <th scope="col" className=" bg-white sticky-top">
                Name
              </th>
              <th scope="col" className=" bg-white sticky-top">
                Phone
              </th>
              <th scope="col" className=" bg-white sticky-top">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.list.map((user, index) => (
              <UserItem
                no={index + 1}
                key={user.id}
                itemId={user.id}
                name={user.name}
                phone={user.phone}
                sent={user.sent}
                delete={() => this.props.delete(user.id)}
                // update={this.props.update}
                resend={this.props.resend}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(`UserList - OP:mapStateToProps state`, state);
  console.log(`UserList - OP:mapStateToProps ownProps`, ownProps);
  return {
    list: state.phoneBook.contacts,
    params: state.phoneBook.params,
  };
};

const mapDispatchToProps = (dispatch) => ({
  load: () => dispatch(loadContact()),
  loadMore: () => dispatch(loadMore()),
  delete: (id) => dispatch(deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
