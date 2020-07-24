import axios from 'axios';

export const MyApiClient = axios.create({
  baseURL: 'https://nameless-waters-69285.herokuapp.com/',
  timeout: 60000,
  headers: {'X-Custom-Header': 'foobar'}
});