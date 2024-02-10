import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const fetchProviders = createAsyncThunk('products/fetchProviders', async () => {
    const data = await axios.get('/providers');
    return data;
})

const initialState = {
    providers: {
        items: [],
        status: 'loading'
    },
}

const providersSlice = createSlice({
    name: 'providers',
    initialState,
    reducers: {},
    extraReducers: {
        //Получение поставщиков
        [fetchProviders.pending]: (state, action) => {
            state.providers.status = 'loading'
        },
        [fetchProviders.fulfilled]: (state, action) => {
            state.providers.items = action.payload
            state.providers.status = 'loaded'
        },
        [fetchProviders.rejected]: (state, action) => {
            state.providers.items = []
            state.providers.status = 'error'
        },


    }
});

export const providersReducer = providersSlice.reducer