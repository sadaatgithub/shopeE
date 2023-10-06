import { apiSlice } from "../services/apiSlice";


const productApiSlice = apiSlice.injectEndpoints({
    tagTypes:["Products"],
    endpoints:(builder) =>({
        getProducts:builder.query({
            query:()=> "products"
        })
    })
});

export const {useGetProductsQuery} = productApiSlice