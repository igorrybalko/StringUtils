import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
 persistReducer,
 FLUSH,
 REHYDRATE,
 PAUSE,
 PERSIST,
 PURGE,
 REGISTER,
 createMigrate,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import common from './slices/common';
import migrations from './migrations';

const persistConfig = {
 key: 'root',
 storage,
 version: 2,
 migrate: createMigrate(migrations, { debug: false }),
};

const rootReducer = combineReducers({
 common,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
 reducer: persistedReducer,
 middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
   serializableCheck: {
    ignoredActions: [
     FLUSH,
     REHYDRATE,
     PAUSE,
     PERSIST,
     PURGE,
     REGISTER,
     'common/getStingByUrl/rejected',
    ],
   },
  }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
