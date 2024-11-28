import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  profile: {},
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    dispatchWebProfile: (state, action) => {
        state.profile = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { dispatchWebProfile } = counterSlice.actions

export default counterSlice.reducer