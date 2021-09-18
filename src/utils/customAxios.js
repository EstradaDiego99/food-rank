import axios from "axios";

export default axios.create(
  process.env.NODE_ENV === "development"
    ? { baseURL: "http://localhost:5000/api" }
    : {}
);
