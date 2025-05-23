import axios from 'axios';

const api = axios.create({
  baseURL: 'http://<YOUR-IP>:8080/api', // replace <YOUR-IP> with your machine's IP address
});

export default api;
