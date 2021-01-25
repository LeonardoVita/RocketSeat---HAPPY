import axios from "axios";

const backend = axios.create({
  baseURL: "http://192.168.0.102:3333",
});

export default backend;
