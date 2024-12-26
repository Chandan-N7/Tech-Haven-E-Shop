import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cart: {
        items: [],
    },
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existProduct = state.cart.items.findIndex(item => item.id === product.id);
            if (existProduct > -1) {
                state.cart.items[existProduct].quantity += product.quantity;
            } else {
                state.cart.items.push(product);
            }
        },
        increaseQuantity: (state, action) => {
            const productId = action.payload;
            const existingProductIndex = state.cart.items.findIndex(item => item.id === productId);
            if (existingProductIndex > -1) {
                state.cart.items[existingProductIndex].quantity += 1; // Increment the quantity
            }
        },
        decreaseQuantity: (state, action) => {
            const productId = action.payload;
            const existingProductIndex = state.cart.items.findIndex(item => item.id === productId);
            if (existingProductIndex > -1) {
                state.cart.items[existingProductIndex].quantity -= 1; // Increment the quantity
            }
        },
        remove: (state, action) => {
            const productId = action.payload;
            const productIndex = state.cart.items.findIndex(item => item.id === productId);
            if (productIndex > -1) {
                state.cart.items.splice(productIndex, 1);
            }
        },
        removeAllItems: (state) => {
            state.cart.items = [];
        }
    }
})

export const { addToCart, increaseQuantity, decreaseQuantity, remove, removeAllItems } = cartSlice.actions;
export default cartSlice.reducer;