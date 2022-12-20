export default function UserItem(props) {
  return (
    <tr>
      <td>{props.no}</td>
      <td>{props.name}</td>
      <td>{props.phone}</td>
      <td>
        <button type="button" className="btn btn-success mx-1">Edit</button>
        <button type="button" className="btn btn-danger mx-1">Delete</button>
      </td>
    </tr>
  );
}
