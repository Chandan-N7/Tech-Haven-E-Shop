import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/ProductSlice"
import cartSlice from "./slices/cartSlice"
export const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartSlice,
    }
})