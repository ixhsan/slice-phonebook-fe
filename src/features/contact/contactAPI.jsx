import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:3039/",
  timout: 1000,
  headers: { Authorization: "token" },
});

export const fetchData = (params, query = {}) =>
  request.get("/api/phonebooks", {
    params: { ...params, ...query },
  });

// export const addContact = (name, phone) =>
