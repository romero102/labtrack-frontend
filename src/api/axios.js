import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // deploy "https://labtrack-backend-5bov.onrender.com/"
});

export default API;