import axios from "axios";

const instance = axios.create({
  
  withCredentials: true,
  credentials:'include',
  // headers: { 'Content-Type': 'application/json'},
  baseURL: process.env.REACT_APP_QA_API_URL,
  
});
export default instance;