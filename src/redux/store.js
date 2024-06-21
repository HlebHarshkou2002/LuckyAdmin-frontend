import { configureStore, combineReducers} from "@reduxjs/toolkit";

import { productsReducer } from "./slices/products";
import { authReducer } from "./slices/auth";
import cartSlice from "./slices/cartSlice";
import { salesReducer } from "./slices/sales";
import { usersReducer } from "./slices/users";
import { suppliesReducer } from "./slices/supplies";
import { providersReducer } from "./slices/providers";
import { shopInfoReducer } from "./slices/shopInfo";
import { ordersReducer } from "./slices/orders";

export const store = configureStore({
    reducer: {
        products: productsReducer,
        auth: authReducer,
        cart: cartSlice,
        sales: salesReducer,
        users: usersReducer,
        supplies: suppliesReducer,
        providers: providersReducer,
        shopInfo: shopInfoReducer,
        orders: ordersReducer
    }
})

export default store;