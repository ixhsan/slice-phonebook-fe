import UserItem from "./UserItem";

export default function UserList(props) {
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Phone</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((user, index) => (
            <UserItem
              key={user.id}
              itemId={user.id}
              no={index + 1}
              name={user.name}
              phone={user.phone}
              delete={() => props.delete(user.id)}
              update={props.update}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
