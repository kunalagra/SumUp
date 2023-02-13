import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8000/",
  Headers: {
    "Content-type": "application/json"
  }
});

