import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4444',
});

// Він додає заголовок авторизації (Authorization)
//  до кожного запиту, використовуючи токен, збережений у localStorage.
instance.interceptors.request.use((config)=>{
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});
export default instance;
