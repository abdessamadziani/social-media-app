import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isFetching: false,
  error: false
}

export const userSlice = createSlice({
  name: 'theUser',
  initialState:initialState,
  reducers: {
    loginStart: (state) => {
       state.isFetching=true
    },
    loginSuccess: (state,action) => {
      state.isFetching = false,
      state.user=action.payload
    },
    loginError: (state) => {
      state.isFetching=false,
      state.error = true
    },
    logout: (state) => {
        state.isFetching=false,
        state.user = {}
      },
  },
})

// Action creators are generated for each case reducer function
export const { loginStart,loginSuccess,loginError,logout } = userSlice.actions

export default userSlice.reducer