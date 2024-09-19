import {combineReducers, configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist';
import {usersReducer} from '../features/Users/usersSlice.ts';
import {postsReducers} from '../features/Posts/postsSlice.ts';

const userPersistConfig = {
  key: 'forumApp:users',
  storage,
  whitelist: ['user'],

};

const rootReducer = combineReducers({
  users: persistReducer(userPersistConfig, usersReducer),
  posts:postsReducers,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    });
  }
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;