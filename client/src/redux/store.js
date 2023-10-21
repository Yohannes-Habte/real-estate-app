import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Store items in the local storage
const rootReducer = combineReducers({ user: userReducer });

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Export store
export const store = configureStore({
  reducer: persistedReducer, // reducer: { user: userReducer } => { user: userReducer }  replaced with persistedReducer in order to store the data in the local storge
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Export persistor
export const persistor = persistStore(store);
