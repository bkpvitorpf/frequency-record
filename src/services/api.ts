import Axios from 'axios';

const Api = Axios.create({
  baseURL: 'https://frequecy-record-backend.herokuapp.com',
  //baseURL: 'http://localhost:3333',
});

export default Api;