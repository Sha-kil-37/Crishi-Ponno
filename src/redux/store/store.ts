import { configureStore } from "@reduxjs/toolkit";
import { adminCategoryApi } from "../rtkQuery/admin/categoryApi";
import { brandApi } from "../rtkQuery/admin/brandApi";
import { adminProductApi } from "../rtkQuery/admin/productApi";
import cartReducer from "../slices/cartSlice";
import { productApi } from "../rtkQuery/shop/product/productApi";
//
export const store = configureStore({
  reducer: {
    // auth: authReducer,
    cart: cartReducer,
    [adminCategoryApi.reducerPath]: adminCategoryApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
    [adminProductApi.reducerPath]: adminProductApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  //
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(adminCategoryApi.middleware)
      .concat(brandApi.middleware)
      .concat(adminProductApi.middleware)
      .concat(productApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
