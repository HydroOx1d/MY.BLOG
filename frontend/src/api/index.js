import axios from 'axios';

const instance = axios.create({
  baseURL: "http://localhost:8080",
})

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token')
  return config
})

export const getPosts = async () => {
  const res = await instance.get('/posts')

  return res.data
}

export const getTags = async () => {
  const res = await instance.get('/tags');

  return res.data
}

export const getFullPost = async (id) => {
  const res = await instance.get('/posts/' + id)

  return res.data
}

export const login = async (loginData) => {
  const res = await instance.post('/auth/login', loginData)

  return res.data
}

export const getMe = async () => {
  const res = await instance.get('auth/me')

  return res.data
}