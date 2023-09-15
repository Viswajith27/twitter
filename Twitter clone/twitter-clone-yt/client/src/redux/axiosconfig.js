import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://twitter-clone-sh.vercel.app', // Set your base URL here
});

export default instance;
