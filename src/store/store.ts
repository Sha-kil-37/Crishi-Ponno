import { configureStore } from "@reduxjs/toolkit";
import { categoryApi } from "./services/categoryApi";
import { brandApi } from "./services/brandApi";
import { productApi } from "./services/productApi";
import cartReducer from "./cartSlice";
//
export const store = configureStore({
  reducer: {
    // auth: authReducer,
    cart: cartReducer,

    [categoryApi.reducerPath]: categoryApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(categoryApi.middleware)
      .concat(brandApi.middleware)
      .concat(productApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
