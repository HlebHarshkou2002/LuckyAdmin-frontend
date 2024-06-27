import { configureStore, combineReducers} from "@reduxjs/toolkit";

import { productsReducer } from "./slices/products";
import { authReducer } from "./slices/auth";
import cartSlice from "./slices/cartSlice";
import { salesReducer } from "./slices/sales";
import { usersReducer } from "./slices/users.ts";
import { suppliesReducer } from "./slices/supplies.ts";
import { providersReducer } from "./slices/providers";
import { shopInfoReducer } from "./slices/shopInfo";
import { ordersReducer } from "./slices/orders";

const store = configureStore({
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

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;