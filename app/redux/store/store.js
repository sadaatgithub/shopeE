import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/authSlice"
import { apiSlice } from "../services/apiSlice";
import {cartReducer} from "../feature/cartSlice";
import variantReducer from "../feature/variantSlice";


export const store = configureStore({
    reducer:{
        auth:authReducer,
        cart:cartReducer,
        variant:variantReducer,
        [apiSlice.reducerPath]:apiSlice.reducer,
    },
    middleware:getDefaultMiddleWare =>
    getDefaultMiddleWare().concat(apiSlice.middleware)
})