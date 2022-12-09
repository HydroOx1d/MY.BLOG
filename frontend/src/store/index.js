import { configureStore } from '@reduxjs/toolkit';

import { postsReducer } from './slices/postSlices';

const store = configureStore({
  reducer: {
    posts: postsReducer
  }
})

export default store;