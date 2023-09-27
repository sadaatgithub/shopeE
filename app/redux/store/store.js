import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/authSlice"
import { apiSlice } from "../services/apiSlice";
import {cartReducer} from "../feature/cartSlice"
export const store = configureStore({
    reducer:{
        auth:authReducer,
        cart:cartReducer,
        [apiSlice.reducerPath]:apiSlice.reducer,
    },
    middleware:getDefaultMiddleWare =>
    getDefaultMiddleWare().concat(apiSlice.middleware)
})