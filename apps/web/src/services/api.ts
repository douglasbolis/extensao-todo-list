import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// A URL base aponta para o servidor backend
export const api = axios.create({
  baseURL: baseURL,
});
