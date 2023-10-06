import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { encode } from "base-64"

const username = 'ck_b329c57e0e2c3fca7be703eb3d9867e75c785841'
const password = 'cs_d03e81232c51795125419ad63f25ea1af2de1094'
const credentials = encode(`${username}:${password}`)


const baseQuery = fetchBaseQuery({
    baseUrl:"https://uat.ekrushak.com/wp-json/wc/v3/",
    // credentials:'include',
    prepareHeaders:(headers)=>{
        headers.set('Authorization',`Basic ${credentials}`)
    }
    // headers:{
    //     "Authorization":`Basic ck_b329c57e0e2c3fca7be703eb3d9867e75c785841:cs_d03e81232c51795125419ad63f25ea1af2de1094`
    // }
    
})


export const apiSlice = createApi({
    reducerPath:"api",
    baseQuery,
    keepUnusedDataFor:180,
    endpoints:(builder) => ({}),
    overrideExisting: true
})