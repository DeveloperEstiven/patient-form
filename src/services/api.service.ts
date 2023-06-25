import axios, { AxiosInstance } from 'axios'

export const api: AxiosInstance = axios.create({
  baseURL: 'https://run.mocky.io/v3',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})
