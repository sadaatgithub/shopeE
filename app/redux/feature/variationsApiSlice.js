import { apiSlice } from "../services/apiSlice";

const variationsApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) =>({
        getVariations:builder.query({
            query:(id) => `products/${id}/variations`
        })
    })
})

export const { useGetVariationsQuery}  = variationsApiSlice;