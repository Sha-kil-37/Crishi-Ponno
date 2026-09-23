import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  productId: string;
  name: string;
  slug: string;
  price: number;
  unit: string;
  imageUrl?: string;
  quantity: number;
  availableStock?: number;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const item = state.items.find(
        (cartItem) => cartItem.productId === action.payload.productId,
      );

      if (item) {
        item.quantity = Math.min(
          item.quantity + action.payload.quantity,
          action.payload.availableStock ?? Number.MAX_SAFE_INTEGER,
        );
        return;
      }

      state.items.push(action.payload);
    },
    setItemQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>,
    ) => {
      const item = state.items.find(
        (cartItem) => cartItem.productId === action.payload.productId,
      );
      if (item) item.quantity = Math.max(1, action.payload.quantity);
    },
  },
});

export const { addItem, setItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
