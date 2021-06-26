import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:9000", --> for local testing
  baseURL: "https://noslack-mern.herokuapp.com/",
});

export default instance;
