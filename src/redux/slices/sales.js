import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const fetchSales = createAsyncThunk('products/fetchSales', async () => {
    const data = await axios.get('/sales');
    return data;
})

const initialState = {
    sales: {
        items: [],
        status: 'loading'
    },
}

const salesSlice = createSlice({
    name: 'sales',
    initialState,
    reducers: {},
    extraReducers: {
        //Получение товаров
        [fetchSales.pending]: (state, action) => {
            state.sales.status = 'loading'
        },
        [fetchSales.fulfilled]: (state, action) => {
            state.sales.items = action.payload
            state.sales.status = 'loaded'
        },
        [fetchSales.rejected]: (state, action) => {
            state.sales.items = []
            state.sales.status = 'error'
        },


    }
});

export const salesReducer = salesSlice.reducer