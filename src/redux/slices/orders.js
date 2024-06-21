import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const fetchOrders = createAsyncThunk('products/fetchOrders', async () => {
    const data = await axios.get('/orders');
    return data;
})

const initialState = {
    orders: {
        items: [],
        status: 'loading'
    },
}

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: {
        //Получение товаров
        [fetchOrders.pending]: (state, action) => {
            state.orders.status = 'loading'
        },
        [fetchOrders.fulfilled]: (state, action) => {
            state.orders.items = action.payload
            state.orders.status = 'loaded'
        },
        [fetchOrders.rejected]: (state, action) => {
            state.orders.items = []
            state.orders.status = 'error'
        },


    }
});

export const ordersReducer = ordersSlice.reducer