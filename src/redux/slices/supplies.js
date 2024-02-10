import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const fetchSupplies = createAsyncThunk('products/fetchSupplies', async () => {
    const data = await axios.get('/supplies');
    return data;
})

const initialState = {
    supplies: {
        items: [],
        status: 'loading'
    },
}

const suppliesSlice = createSlice({
    name: 'supplies',
    initialState,
    reducers: {},
    extraReducers: {
        //Получение товаров
        [fetchSupplies.pending]: (state, action) => {
            state.supplies.status = 'loading'
        },
        [fetchSupplies.fulfilled]: (state, action) => {
            state.supplies.items = action.payload
            state.supplies.status = 'loaded'
        },
        [fetchSupplies.rejected]: (state, action) => {
            state.supplies.items = []
            state.supplies.status = 'error'
        },


    }
});

export const suppliesReducer = suppliesSlice.reducer