import axios from "axios";

const instance = axios.create({
  
  withCredentials: true,
  credentials:'include',
  baseURL: process.env.REACT_APP_FINAL_API_URL,
});
export default instance;