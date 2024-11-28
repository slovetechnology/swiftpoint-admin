import { configureStore } from '@reduxjs/toolkit'
import dataReducer from './webreducer'

export const store = configureStore({
  reducer: {
    data: dataReducer,
  },
})