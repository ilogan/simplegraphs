import axios from "axios";

const simplecast = axios.create({
  baseURL: "https://api.simplecast.com",
  timeout: 1000,
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_SIMPLECAST_KEY}`
  }
});

export default simplecast;
