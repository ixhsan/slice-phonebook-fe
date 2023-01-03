import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:3039/",
  timout: 1000,
  headers: { Authorization: "token", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*", "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS" },
});

//. load contact
export const fetchData = (params, query = {}) => {
  console.log(params);
  return request.get("/api/phonebooks", {
    params: { ...params, ...query },
  });
};

//. add contact
export const addData = ({ name, phone }) => request.post("/api/phonebooks", { name, phone })

//. update contact
export const updateData = ({ id, name, phone }) => request.put(`/api/phonebooks/${id}`, { name, phone });

//. delete contact
export const deleteData = ({id}) => request.delete(`/api/phonebooks/${id}`);

// export const addContact = (name, phone) =>
