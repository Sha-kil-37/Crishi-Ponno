import { configureStore } from "@reduxjs/toolkit";
import { categoryApi } from "./services/categoryApi";
import { brandApi } from "./services/brandApi";
//
export const store = configureStore({
  reducer: {
    // auth: authReducer,
    // cart: cartReducer,

    [categoryApi.reducerPath]: categoryApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(categoryApi.middleware).concat(brandApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
