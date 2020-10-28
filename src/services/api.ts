import Axios from 'axios';

const api = Axios.create({
  //baseURL: 'http://localhost:3333'
  baseURL: 'https://frequecy-record-backend.herokuapp.com'
});

export default api;