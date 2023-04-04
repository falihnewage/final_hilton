import axios from "axios";

const instance = axios.create({
  
  withCredentials: true,
  credentials:'include',
  headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
  baseURL: process.env.REACT_APP_FINAL_API_URL,
  
});
export default instance;