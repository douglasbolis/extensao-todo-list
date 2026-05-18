import axios from 'axios';

// A URL base aponta para o servidor backend local
export const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});
