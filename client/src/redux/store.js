import { configureStore } from '@reduxjs/toolkit'
 import userReducer from './userSlice'




import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
 const rootReducer =  userReducer
 
const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer)
 








export const store = configureStore({
    reducer: {
        theUser: persistedReducer,
      },})

export const persistor = persistStore(store)
