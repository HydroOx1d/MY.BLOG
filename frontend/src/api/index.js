import axios from 'axios';

const instance = axios.create({
  baseURL: "https://my-blog-4i9v.onrender.com/",
})

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token')
  return config
})

export const uploadFile = async (file) => {
  const res = await instance.post('/upload', file)

  return res.data
}

export const getPosts = async () => {
  const res = await instance.get('/posts')

  return res.data
}

export const getPostsByTag = async (tagId) => {
  const res = await instance.get('/tags/' + tagId)

  return res.data
}

export const getTags = async () => {
  const res = await instance.get('/tags');

  return res.data
}

export const getComments = async () => {
  const res = await instance.get('/comments')

  return res.data
}

export const getFullPost = async (id) => {
  const res = await instance.get('/posts/' + id)

  return res.data
}

export const createPost = async (postData) => {
  const res = await instance.post('/posts', postData)

  return res.data
}

export const removePost = async (postId) => {
  const res = await instance.delete('/posts/' + postId)

  return res.data
}

export const updatePost = async (postId, updatingData) => {
  const res = await instance.patch('/posts/' + postId, updatingData)

  return res.data
}

export const login = async (loginData) => {
  const res = await instance.post('/auth/login', loginData)

  return res.data
}

export const register = async (registerData) => {
  const res = await instance.post('/auth/register', registerData)

  return res.data
}

export const getMe = async () => {
  const res = await instance.get('auth/me')

  return res.data
}

export const addComment = async (postId, text) => {
  const res = await instance.post('/posts/' + postId + '/comment', {text})

  return res.data
}