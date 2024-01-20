import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const data = await axios.get('/products');
    return data;
})

export const fetchRemoveProduct = createAsyncThunk('products/fetchRemoveProduct', async (id) => {
    await axios.delete(`/products/${id}`)
})

const initialState = {
    products: {
        items: [],
        status: 'loading'
    },
    genres: {
        items: [],
        status: 'loading'
    }
    
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: {
        //Получение товаров
        [fetchProducts.pending]: (state, action) => {
            state.products.status = 'loading'
        },
        [fetchProducts.fulfilled]: (state, action) => {
            state.products.items = action.payload
            state.products.status = 'loaded'
        },
        [fetchProducts.rejected]: (state, action) => {
            state.products.items = []
            state.products.status = 'error'
        },

        //Удаление товара
        [fetchRemoveProduct.pending]: (state, action) => {
            debugger
            state.products.items.data = state.products.items.data.filter(obj => obj.id !== action.meta.arg)
        },
    }
});

export const productsReducer = productsSlice.reducer