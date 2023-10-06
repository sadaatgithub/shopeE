import { apiSlice } from "../services/apiSlice";


const productApiSlice = apiSlice.injectEndpoints({
    tagTypes:["Products"],
    endpoints:(builder) =>({
        getProducts:builder.query({
            query:()=> "products"
        }),
        getProductById:builder.query({
            query:(id)=> `products/${id}`
        })
    })
});

export const {useGetProductsQuery,useGetProductByIdQuery} = productApiSlice