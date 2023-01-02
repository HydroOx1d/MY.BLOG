import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { login, getMe} from "../../api"

export const loginThunk = createAsyncThunk('auth/login', async (loginData) => {
  const data = await login(loginData);

  if('token' in data) {
    window.localStorage.setItem('token', data.token)
  }

  return data
})

export const getMeThunk = createAsyncThunk('auth/getMe', async () => {
  const data = await getMe()

  return data
})

const initialState = {
  data: null, 
  status: "loading"
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null
      window.localStorage.removeItem('token')
    }
  },
  extraReducers: {
    [loginThunk.pending]: (state) => {
      state.status = 'loading'
      state.data = null
    },
    [loginThunk.fulfilled]: (state, action) => {
      state.status = 'loaded'
      state.data = action.payload
    },
    [loginThunk.rejected]: (state) => {
      state.status = 'error'
      state.data = null
    },

    [getMeThunk.pending]: (state) => {
      state.status = 'loading'
      state.data = null
    },
    [getMeThunk.fulfilled]: (state, action) => {
      state.status = 'loaded'
      state.data = action.payload
    },
    [getMeThunk.rejected]: (state) => {
      state.status = 'error'
      state.data = null
    }
  }
})

export const authReducer = authSlice.reducer

export const { logout } = authSlice.actions