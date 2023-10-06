import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"



const baseQuery = fetchBaseQuery({
    baseUrl:"https://fakestoreapi.com/",
    credentials:'include'
})


export const apiSlice = createApi({
    reducerPath:"api",
    baseQuery,
    keepUnusedDataFor:180,
    endpoints:(builder) => ({})
})