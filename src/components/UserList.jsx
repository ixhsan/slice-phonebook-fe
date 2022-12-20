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
        {props.data.map((user, index) => (
          <UserItem no={index + 1} key={user.id} name={user.name} phone={user.phone} />
        ))}
      </tbody>
    </table>
  );
}
