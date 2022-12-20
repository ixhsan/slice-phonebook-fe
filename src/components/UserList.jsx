import { Component } from "react";
import UserItem from "./UserItem";

export default function UserList(props) {
  return (
    <table className="table table-striped">
      <thead>
        <th>No.</th>
        <th>Name</th>
        <th>Phone</th>
      </thead>
      <tbody>
        {this.props.data.map((user, index) => (
          <UserItem no={index + 1} name={user.name} phone={user.phone} />
        ))}
      </tbody>
    </table>
  );
}
