import axios from "axios";

export default axios.create({
  baseURL: "https://api-finance.startex.la/api/v1/",
  headers: {
    "ngrok-skip-browser-warning": true,
  },

  
});
