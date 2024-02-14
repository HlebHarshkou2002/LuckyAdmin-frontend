import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const fetchAdminProducts = createAsyncThunk('products/fetchAdminProducts', async () => {
    const data = await axios.get('/admin/products');
    return data;
})

export const fetchRemoveAdminProduct = createAsyncThunk('products/fetchRemoveAdminProduct', async (id) => {
    await axios.delete(`/admin/products/${id}`)
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

const adminProductsSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers: {},
    extraReducers: {
        //Получение товаров
        [fetchAdminProducts.pending]: (state, action) => {
            state.products.status = 'loading'
        },
        [fetchAdminProducts.fulfilled]: (state, action) => {
            state.products.items = action.payload
            state.products.status = 'loaded'
        },
        [fetchAdminProducts.rejected]: (state, action) => {
            state.products.items = []
            state.products.status = 'error'
        },

        //Удаление товара
        [fetchRemoveAdminProduct.pending]: (state, action) => {
            state.products.items.data = state.products.items.data.filter(obj => obj.id !== action.meta.arg)
        },
    }
});

export const adminProductsReducer = adminProductsSlice.reducer