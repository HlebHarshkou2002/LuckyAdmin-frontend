import { configureStore, combineReducers} from "@reduxjs/toolkit";

import { productsReducer } from "./slices/products";
import { authReducer } from "./slices/auth";
import cartSlice from "./slices/cartSlice";
import { salesReducer } from "./slices/sales";

// const rootReducer = combineReducers({
//     products: productsReducer
//   })

const store = configureStore({
    reducer: {
        products: productsReducer,
        auth: authReducer,
        cart: cartSlice,
        sales: salesReducer
    }
})

export default store;