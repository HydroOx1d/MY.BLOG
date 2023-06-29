import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { getComments, getPosts, getTags, removePost } from "../../api";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const data = await getPosts()
  return data;
})

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const tags = await getTags()

  return tags
})

export const fetchComments = createAsyncThunk('posts/fetchComments', async () => {
  const comments = await getComments()

  return comments
})

export const removePostThunk = createAsyncThunk('posts/removePost', async (postId) => {
  const data = await removePost(postId)

  return data.data._id
})


const initialState = {
  posts: {
    items: [],
    status: "loading"
  },
  tags: {
    items: [],
    status: "loading"
  },
  comments: {
    items: [],
    status: "loading"
  }
}

const postsSlice = createSlice({
  name: "posts",
  initialState,

  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "loaded";
    },

    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = "loaded";
    },

    [fetchComments.pending]: (state) => {
      state.comments.items = [];
      state.comments.status = "loading";
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = "loaded";
    },
    [fetchComments.rejected]: (state) => {
      state.comments.items = [];
      state.comments.status = "loaded";
    },

    [removePostThunk.pending]: (state) => {
      state.posts.status = "loading";
    },
    [removePostThunk.fulfilled]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (post) => post._id !== action.payload
      );
      state.posts.status = "loaded";
    },
    [removePostThunk.rejected]: (state) => {
      state.posts.status = "loaded";
    },
  },
});

export const postsReducer = postsSlice.reducer