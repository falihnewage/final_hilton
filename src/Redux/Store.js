import { configureStore } from '@reduxjs/toolkit'

import UserReducer from './Features/Userslice'
import AuthReducer from './Features/Authslice'

export const store = configureStore({
  reducer: {
   
    User:UserReducer,
    Auth:AuthReducer
    
    
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})