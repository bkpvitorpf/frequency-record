import Axios from 'axios';

const Api = Axios.create({
  baseURL: 'https://frequency-record-backend.herokuapp.com'
  //baseURL: 'http://localhost:3333',
});

export default Api;