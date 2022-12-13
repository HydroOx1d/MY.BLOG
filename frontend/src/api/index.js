import axios from 'axios';

const instance = axios.create({
  baseURL: "http://localhost:8080",
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