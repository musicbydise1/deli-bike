import { configureStore } from '@reduxjs/toolkit';
import { bikesApi } from './services/bikesApi';
import { rentalsApi } from './services/rentalsApi';
import { adminApi } from './services/adminApi';
import { authApi } from './services/authApi';

export const store = configureStore({
  reducer: {
    [bikesApi.reducerPath]: bikesApi.reducer,
    [rentalsApi.reducerPath]: rentalsApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      bikesApi.middleware,
      rentalsApi.middleware,
      adminApi.middleware,
      authApi.middleware,
    ),
});
