import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    items: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action) {
            state.items.push(action.payload);
            state.totalPrice += action.payload.price;
        },
        removeItem(state, action) {
            state.items = state.items.filter(obj => obj.id !== action.payload.id)
            state.totalPrice -= action.payload.price
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
        }
    }
})

export const {addItem, removeItem, clearItems} = cartSlice.actions;

export default cartSlice.reducer;