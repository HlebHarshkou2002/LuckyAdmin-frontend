import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const fetchOrders = createAsyncThunk('products/fetchOrders', async () => {
    const data = await axios.get('/orders');
    return data.data;
})

const initialState = {
    orders: [],
    status: 'loading'
}

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addOrder: (state, action) => {
            let newOrders = [...state.orders];
            
            newOrders.push(action.payload)
            return {
                ...state,
                orders: newOrders
            };
        },
        orderReady: (state, action) => {
            let newOrders = [...state.orders];

            newOrders = newOrders.map((order) => {
                if(order._id === action.payload.orderId) {
                    return {
                        ...order,
                        orderStatus: "ready"
                    }
                } else {
                    return order;
                }
            })
            return {
                ...state,
                orders: newOrders
            };
        },
        orderApprove: (state, action) => {
            let newOrders = [...state.orders];

            newOrders = newOrders.map((order) => {
                if(order._id === action.payload.orderId) {
                    return {
                        ...order,
                        orderStatus: "approve"
                    }
                } else {
                    return order;
                }
            })
            return {
                ...state,
                orders: newOrders
            };
        }
    },
    extraReducers: {
        //Получение товаров
        [fetchOrders.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchOrders.fulfilled]: (state, action) => {
            state.orders = action.payload
            state.status = 'loaded'
        },
        [fetchOrders.rejected]: (state, action) => {
            state.orders = []
            state.status = 'error'
        },


    }
});

export const ordersReducer = ordersSlice.reducer
export const { addOrder } = ordersSlice.actions;
export const { orderReady } = ordersSlice.actions;
export const { orderApprove } = ordersSlice.actions;