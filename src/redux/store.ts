import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import {
  userReducer,
} from './slices';
import { 
  userApi,
  listingApi,
} from './apis';

export const store = configureStore({
  reducer: {
    userStore: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [listingApi.reducerPath]: listingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(listingApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
